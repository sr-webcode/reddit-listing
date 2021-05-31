import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'
import { List, Typography, Divider, Button } from 'antd'
import { CommentOutlined, ShareAltOutlined, CaretDownFilled, CaretUpFilled } from '@ant-design/icons'

import useFetch from 'hooks/useFetch'
import ContentModal from './components/ContentModal'
import PageSpinner from 'components/PageSpinner'
import CopyClipBoard from 'components/CopyClipBoard'
import { theme } from 'config/theme'
import { IRedditResponse } from 'types/reddit'

interface IModalState {
  visible: boolean;
  redditLink: string;
}

const defaultModalState: IModalState = { redditLink: "", visible: false }
const NO_IMG = 'assets/images/no-image.png'
const { Title, Text } = Typography

const StyledListItem = styled(List.Item)`
  cursor: pointer;
  &:hover {    
    background-color: ${theme.LIGHT_BG_GRAY};
    .post-title {
      text-decoration: underline;
    }
  }
`
const StyledThumbnail = styled.img`
  width:50px;
  height: 50px;
  object-fit: cover !important;
`

const ContentPage: React.FC = () => {

  const location = useLocation();
  const [modalInfo, setModalInfo] = useState<IModalState>(defaultModalState)
  const { data, loading, fetchMoreLoading, fetchMore } = useFetch(`${process.env.REACT_APP_REDDIT_API_URL}${location.pathname}.json`)
  const redditData: IRedditResponse = data || { kind: "", data: { children: [], before: "", after: "" } };

  if (loading) return <PageSpinner />
  const { data: { children, after, before } } = redditData;

  return (
    <div className="pb-3">
      {Boolean(children.length) && (
        <List
          className="mb-3"
          dataSource={children}
          loading={fetchMoreLoading}
          renderItem={(item, idx) => {

            const { title, author, thumbnail, id, permalink, score,
              subreddit_name_prefixed, created_utc, num_comments } = item.data

            const timeAgo = moment.unix(created_utc).fromNow();
            const thumbImg = thumbnail.includes('htt') ? thumbnail : NO_IMG;

            return (
              <StyledListItem key={id} onClick={() => setModalInfo({ redditLink: permalink, visible: true })}>
                <div className="mw-1200 w-100 mx-auto px-3 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mr-3 d-flex align-items-center">
                      <Title level={4} type="secondary" className="m-0">{idx += 1}</Title>
                      <div style={{ minWidth: '100px' }}>
                        <Text type="secondary" className="m-0 d-block d-flex flex-column align-items-center">
                          <CaretUpFilled />
                          {score.toString()}
                          <CaretDownFilled />
                        </Text>
                      </div>
                      <StyledThumbnail src={thumbImg} />
                    </div>
                    <div>
                      <Title level={5} className="m-0 post-title">{title.length > 96 ? title.substr(0, 50) + "..." : title}</Title>
                      <Text type="secondary">
                        Posted {timeAgo} ago by: <span className="font-weight-bold">{author}</span> on  <span className="font-weight-bold">{subreddit_name_prefixed}</span>
                      </Text>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Text type="secondary"><CommentOutlined className="mr-1" />{num_comments.toString()}</Text>
                    <Divider className="mx-3" type="vertical" />
                    <CopyClipBoard text={`${process.env.REACT_APP_REDDIT_API_URL}${permalink}`}>
                      <Button
                        onClick={(e) => e.stopPropagation()}
                        icon={<ShareAltOutlined />}>
                        Share
                    </Button>
                    </CopyClipBoard>
                  </div>
                </div>
              </StyledListItem>)
          }}
        />
      )}
      {Boolean(modalInfo.redditLink) && (
        <ContentModal
          redditLink={modalInfo.redditLink}
          visible={modalInfo.visible}
          onCancel={() => setModalInfo(defaultModalState)} />
      )}
      {after && <div className="d-flex justify-content-center">
        <Button
          disabled={loading || fetchMoreLoading}
          loading={fetchMoreLoading}
          style={{ maxWidth: 220 }}
          className="w-100"
          type="primary"
          size="large"
          onClick={() => fetchMore(before, after)}>
          Load More
        </Button>
      </div>}
    </div>
  )
}
export default ContentPage