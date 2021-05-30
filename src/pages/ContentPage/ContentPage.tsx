import styled from 'styled-components'
import { List, Typography, Divider, Button } from 'antd'
import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons'

import { theme } from 'config/theme'

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

const ContentPage: React.FC = () => {  
  return (
    <div>
      <List
        dataSource={new Array(20).fill("record")}
        renderItem={(item, idx) => (
          <StyledListItem key={idx}>
            <div className="mw-1200 w-100 mx-auto px-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="mr-4">
                  <Title level={4} type="secondary" className="m-0">{idx += 1}</Title>
                </div>
                <div>
                  <Title level={5} className="m-0 post-title">Title</Title>
                  <Text type="secondary">
                    {"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quaerat et, odit quis incidunt ..."}
                  </Text>
                </div>
              </div>
              <div className="meta-info">
                <Button icon={<ShareAltOutlined />}>Share</Button>
                <Divider className="mx-3" type="vertical" />
                <Text type="secondary"><CommentOutlined className="mr-1" />500</Text>
              </div>
            </div>
          </StyledListItem>
        )}
      />
    </div>
  )
}
export default ContentPage