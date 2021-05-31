import styled from 'styled-components'
import moment from 'moment'
import { Modal, Skeleton, Typography, Button, Divider } from 'antd'
import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons'

import useFetch from 'hooks/useFetch'
import CopyClipBoard from 'components/CopyClipBoard'
import { IRedditResponse } from 'types/reddit'

interface IModalProps {
  visible: boolean;
  redditLink: string;
  onCancel: () => void;
}

const { Title, Text, Paragraph } = Typography
const StyledModal = styled(Modal)`
  max-width: 800px;
`
const StyledPostImage = styled.img`
  width: 420px;
  height: 420px;
  object-fit: cover;
`

const ContentModal: React.FC<IModalProps> = ({ visible, onCancel, redditLink }) => {

  const { data, loading } = useFetch(`${process.env.REACT_APP_REDDIT_API_URL}${redditLink}.json`)
  const postData: IRedditResponse[] = (data as any) || []

  return (
    <StyledModal
      destroyOnClose
      className="w-100"
      visible={visible}
      footer={null}
      maskClosable={false}
      onCancel={onCancel}
    >
      {loading ? <>
        <Skeleton.Avatar size="small" active className="mr-2" />
        <Skeleton.Button size="small" className="mr-2" style={{ width: 150 }} active />
        <Skeleton.Button size="small" className="mb-2" style={{ width: 150 }} active />
        <Skeleton active />
        <Skeleton active />
      </> : <>
        {!Boolean(postData.length) ? <div>no content</div> : (
          <div>
            {/* post */}
            {postData[0].data.children.map((node) => {

              const { title, id, is_video, secure_media, url, author, num_comments,
                created_utc, subreddit_name_prefixed, permalink, thumbnail } = node.data
              const timeAgo = moment.unix(created_utc).fromNow();
              const isGif = url.includes('.gif');
              const isLegitImage = isGif || /[.](gif|jpg|jpeg|tiff|png)$/i.test(url);
              const imgSrc = isGif ? thumbnail : url

              return (
                <div key={id} className="mb-4">
                  <div className="mb-3">
                    <Text type="secondary" className="d-block mb-2">
                      Posted {timeAgo} ago by: <span className="font-weight-bold">{author}</span> on  <span className="font-weight-bold">{subreddit_name_prefixed}</span>
                    </Text>
                    <Title level={3} className="m-0 mb-1">
                      {title}
                    </Title>
                    {isLegitImage && <div>
                      <a href={url} target="_blank" rel="noreferrer" >{url}</a>
                      <StyledPostImage
                        className="mt-3 mx-auto"
                        {...isGif && ({ style: { width: 100, height: 100 } })}
                        src={imgSrc}
                        alt={title}
                      />
                    </div>}
                    {is_video && secure_media && (<div className="mt-5 d-flex justify-content-center">
                      <video width="420" height="360" controls>
                        {/* video has no sounds, as sounds files were separated as per Reddit */}
                        <source src={secure_media.reddit_video.fallback_url} type="video/mp4" />
                      </video>
                    </div>
                    )}
                  </div>
                  <div className="post-controls d-flex align-items-center">
                    <Text type="secondary"><CommentOutlined />{num_comments.toString()} Comments</Text>
                    <CopyClipBoard text={`${process.env.REACT_APP_REDDIT_API_URL}${permalink}`}>
                      <Button type="link" icon={<ShareAltOutlined />}>Share</Button>
                    </CopyClipBoard>
                  </div>
                </div>
              )
            })}
            {/* // top level comments */}
            {postData[1].data.children.map((comment, idx) => {
              const { author, body, id, created_utc } = comment.data
              const timeAgo = moment.unix(created_utc).fromNow();
              return <div key={id}>
                <div className="mb-2">
                  <Text strong className="mr-2" >{author}</Text>
                  <Text type="secondary">{timeAgo}</Text>
                </div>
                <Paragraph type="secondary">{body}</Paragraph>
                {idx !== postData[1].data.children.length - 1 && <Divider className="my-2" />}
              </div>
            }
            )}
          </div>
        )
        }
      </>}
    </StyledModal>
  )
}
export default ContentModal