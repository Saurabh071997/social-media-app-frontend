import { Container, Typography } from "@material-ui/core";
import CopyrightIcon from "@material-ui/icons/Copyright";
import {useWindowSize} from '../utils/useWindowSize'

export const Footer = () => {
  const[, width] = useWindowSize()
  return (
    <>
      <Container maxWidth={false} className="footer">
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            style={{ color: "#E2E8F0", fontWeight: "bold" }}
            gutterBottom
          >
            Vibeum
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ color: "#94A3B8" }}
          >
            a product by
          </Typography>
          <Typography
            variant="h4"
            align="center"
            style={{ color: "#0EA5E9", fontWeight: "bold" }}
          >
            arepo
          </Typography>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                margin: "0rem auto",
              }}
            >
              <div
                style={{
                  margin: "1rem auto",
                  display: "flex",
                }}
              >
                <CopyrightIcon style={{ color: "#94A3B8" }} />
                <Typography variant="subtitle2" style={{ color: "#94A3B8" }}>
                  2021. All rights reserved
                </Typography>
              </div>
            </div>
          </div>
        </Container>
          {width<= 700 && <div style={{minHeight:"10vh"}}></div>}
      </Container>
    </>
  );
};
