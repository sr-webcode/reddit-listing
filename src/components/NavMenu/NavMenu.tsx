import styled from 'styled-components'
import cx from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { Typography, Avatar } from 'antd'
import { RedditOutlined, UserOutlined } from '@ant-design/icons'

import { theme } from 'config/theme'
import { CONTENT_PAGE_ROUTES } from 'config/routes'

const { Title } = Typography

const StyledHeader = styled.header`
  .active-menu {
    color: #FFFF !important;
  }
  background-color: ${theme.PRIMARY_BG_COLOR};
`
const StyledRedditIcon = styled(RedditOutlined)`
  font-size: 60px !important;
`
const StyledNavLink = styled(Link)`
  color: #d6d6d6 !important;
  &:hover {
    color: #FFFF !important;
  }
  span {
    font-size: 18px !important;
  }
`

const NavMenu: React.FC = () => {

  const location = useLocation();
  
  return (
    <StyledHeader className="py-2 px-3">
      <div className="mw-1200 mx-auto d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-5">
            <StyledRedditIcon className="mr-3 text-white" />
            <Title level={2} className="mb-0 text-white font-weight-light">reddit</Title>
          </div>
          <nav>
            {CONTENT_PAGE_ROUTES.map((route, idx) => (
              <StyledNavLink to={`/${route}`} key={idx}
                type="link"
                className={cx({
                  "p-0 m-0 mr-3 text-capitalize fs-18": true,
                  "active-menu": location.pathname === `/${route}`
                })}
              >
                {route}
              </StyledNavLink>
            ))}
          </nav>
        </div>
        <div>
          <Avatar icon={<UserOutlined />} size={42} style={{ background: "#DDDD" }} />
        </div>
      </div>
    </StyledHeader>
  )
}
export default NavMenu