import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  min-height: 35px;
  color: #fff;
  background-color: limegreen;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all .25s;
  &:hover {
    background-color: white;
    color: limegreen;
  }
`

export const Link = styled.a`
  color: #fff;
  text-decoration: none;
`

export const Film = styled.div`
  display: block;
  width: 250px;
  margin: 0 30px;
  .info-title,
  .info-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    margin-bottom: 15px;
  }
  .info-title {
    margin-bottom: 15px;
  }
  .info-description {
    min-height: 30px;
  }
`

export const TitleH2 = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: #cccc00;
`