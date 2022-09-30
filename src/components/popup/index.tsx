import styled from 'styled-components';

export const PopupCss = styled.figure`
  margin: 0;
`
export const Popup = () => {
  return (
    <>
      <PopupCss>
        <div className="header">
          header
        </div>
        <div className="body">
          body
        </div>
        <div className="footer">
          footer
        </div>
      </PopupCss>
    </>
  )
}