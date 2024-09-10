import { globalStyle } from '@vanilla-extract/css';
import { vars } from './vars.css';

const Icon = {
  Book: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxOCAxOCI+CiAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTMuODAzIDEzLjE1MmMwIDEuMzQyLjcyNiAyLjA2OSAyLjA1NiAyLjA2OWg2LjI3NmMxLjMzIDAgMi4wNTYtLjcyNyAyLjA1Ni0yLjA2OXYtOC43NmMwLTEuMzM1LS43MjYtMi4wNjgtMi4wNTYtMi4wNjhINS44NTljLTEuMzMgMC0yLjA1Ni43MzMtMi4wNTYgMi4wNjl2OC43NlptMy4wNy03LjUxMWEuNDA4LjQwOCAwIDAgMS0uNDIyLS40MTZjMC0uMjI5LjE3Ni0uNDEuNDIyLS40MWg0LjM4M2MuMjQgMCAuNDE2LjE4MS40MTYuNDFhLjQwNy40MDcgMCAwIDEtLjQxNi40MTZINi44NzNabTAgMS43NGEuNDA4LjQwOCAwIDAgMS0uNDIyLS40MTZjMC0uMjI5LjE3Ni0uNDA0LjQyMi0uNDA0aDIuNTQzYS40LjQgMCAwIDEgLjQxNi40MDQuNDA3LjQwNyAwIDAgMS0uNDE2LjQxNkg2Ljg3M1ptLjA4MiA1LjU0M2MtLjQ4NiAwLS43NjgtLjI2NC0uNzY4LS43NjJWOS4wNTFjMC0uNDk4LjI4Mi0uNzU2Ljc2OC0uNzU2aDQuMTAyYy40OTggMCAuNzU1LjI1OC43NTUuNzU2djMuMTExYzAgLjQ5OC0uMjU3Ljc2Mi0uNzU1Ljc2Mkg2Ljk1NVoiLz4KPC9zdmc+")',
  ChevronRight:
    'url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjE3IiBzdHlsZT0idHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpIiB2aWV3Qm94PSIwIDAgMTEgMTciIHdpZHRoPSIxMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMC45OTcwNyA4LjY1NDNDMC45OTcwNyA5LjA4NDk2IDEuMTU1MjcgOS40NDUzMSAxLjUxNTYyIDkuNzk2ODhMOC4xNjAxNiAxNi4zMDk2QzguNDMyNjIgMTYuNTczMiA4Ljc0OTAyIDE2LjcwNTEgOS4xMzU3NCAxNi43MDUxQzkuOTA5MTggMTYuNzA1MSAxMC41NTA4IDE2LjA4MTEgMTAuNTUwOCAxNS4zMDc2QzEwLjU1MDggMTQuOTEyMSAxMC4zODM4IDE0LjU2MDUgMTAuMDkzOCAxNC4yNzA1TDQuMzAxNzYgOC42NDU1MUwxMC4wOTM4IDMuMDI5M0MxMC4zODM4IDIuNzQ4MDUgMTAuNTUwOCAyLjM4NzcgMTAuNTUwOCAyLjAwMDk4QzEwLjU1MDggMS4yMzYzMyA5LjkwOTE4IDAuNjAzNTE2IDkuMTM1NzQgMC42MDM1MTZDOC43NDkwMiAwLjYwMzUxNiA4LjQzMjYyIDAuNzM1MzUyIDguMTYwMTYgMC45OTkwMjNMMS41MTU2MiA3LjUxMTcyQzEuMTU1MjcgNy44NTQ0OSAxLjAwNTg2IDguMjE0ODQgMC45OTcwNyA4LjY1NDNaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD48L3N2Zz4=)',
  Close:
    'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxOCAxOCI+CiAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTQuNCAxMy4zN2MuMzQ2LjMzOS45MzIuMzMzIDEuMjQ4LjAxbDMuMzQ2LTMuMzQ1IDMuMzQ2IDMuMzQ2YS44OTUuODk1IDAgMCAwIDEuMjQyLS4wMTJjLjM0LS4zNDUuMzQ2LS45MTQuMDEyLTEuMjQ4bC0zLjM0LTMuMzQ2IDMuMzQtMy4zNGEuODkyLjg5MiAwIDAgMC0uMDEyLTEuMjQ3Yy0uMzQtLjM0LS45MTQtLjM0LTEuMjQyLS4wMTJMOC45OTQgNy41MiA1LjY0OCA0LjE3NmMtLjMxNi0uMzIyLS45MDgtLjMzNC0xLjI0OC4wMTJhLjkxNC45MTQgMCAwIDAtLjAxMSAxLjI0OGwzLjM1MSAzLjM0LTMuMzUxIDMuMzUxYy0uMzE3LjMxNi0uMzI4LjkwOC4wMTEgMS4yNDJaIi8+Cjwvc3ZnPg==")',
  Esc: 'url("data:image/svg+xml;base64,IDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMjQgMTIiPgogICAgICA8cGF0aAogICAgICAgIGZpbGw9ImN1cnJlbnRDb2xvciIKICAgICAgICBkPSJNNC4wMiA5aDMuMDE1Yy4zNjQgMCAuNjAyLS4yMDcuNjAyLS41NSAwLS4zNDItLjI0Mi0uNTQ5LS42MDItLjU0OUg0LjY4NHYtMS42SDYuOTJjLjMzNCAwIC41NTQtLjE5My41NTQtLjUwOXMtLjIyNC0uNTEtLjU1NC0uNTFINC42ODRWMy43NTdoMi4zNWMuMzYxIDAgLjYwMy0uMjA2LjYwMy0uNTQ5IDAtLjM0My0uMjM4LS41NS0uNjAyLS41NUg0LjAyYy0uNDE3IDAtLjY2NC4yNTYtLjY2NC42OXY0Ljk1OGMwIC40NC4yNDcuNjk0LjY2NC42OTRabTcuMzU2LjEwNWMxLjU4MiAwIDIuNTUzLS43ODIgMi41NTMtMi4wMjEgMC0uOTYyLS41OC0xLjUwMy0xLjkyNS0xLjc3MWwtLjY2OC0uMTM2Yy0uNzUxLS4xNS0xLjA1NC0uMzkxLTEuMDU0LS43ODIgMC0uNDY2LjQzNS0uNzc0IDEuMDktLjc3NC41NDQgMCAuOTUzLjE5OCAxLjE2NC42NzcuMTUuMjcyLjMzNC4zOTEuNjMzLjM5MS4zMzggMCAuNTY3LS4yMTUuNTY3LS41MzJhLjg2Ljg2IDAgMCAwLS4wNDktLjI5NGMtLjI4LS44MjYtMS4xNTUtMS4zMTQtMi4zMTUtMS4zMTQtMS40MTEgMC0yLjQyMi43NjktMi40MjIgMS45MjkgMCAuOTQ1LjYyIDEuNTUxIDEuODg2IDEuODAybC42NzIuMTMyYy43OTUuMTYyIDEuMDk0LjQgMS4wOTQuODE3IDAgLjQ2Ni0uNDgzLjgwOS0xLjE5NS44MDktLjYwNyAwLTEuMTAzLS4yMi0xLjMxLS43MDQtLjE1OC0uMjgtLjMzOC0uMzg2LS42MS0uMzg2LS4zNDMgMC0uNTg1LjIzMy0uNTg1LjU4NCAwIC4xMTkuMDI2LjI0Mi4wNy4zNTYuMjU1LjY5NSAxLjA5NCAxLjIxNyAyLjQwNCAxLjIxN1ptNi43MzIgMGMxLjIgMCAyLjE0NC0uNTQgMi41NC0xLjQxOWExLjEgMS4xIDAgMCAwIC4xMDEtLjQ0NGMwLS4zNTEtLjI0Ni0uNTg5LS42Mi0uNTg5LS4yOCAwLS40NDguMTE5LS41ODQuNDE4LS4yODYuNjM3LS43ODcuOTQtMS40NTUuOTQtMS4wMTUgMC0xLjY1Mi0uODM1LTEuNjUyLTIuMTg4IDAtMS4zMzYuNjQ2LTIuMTc2IDEuNjQ4LTIuMTc2LjYzMyAwIDEuMTUxLjMyNiAxLjQ0MS45NzIuMTQ1LjMwNy4zMzQuNDQuNjMzLjQ0LjM1MiAwIC41ODUtLjIyNS41ODUtLjU3MiAwLS4xNTgtLjA0NC0uMzMtLjEzMi0uNDk3LS40MzUtLjkxNC0xLjM1NC0xLjQ0MS0yLjU0LTEuNDQxLTEuODI0IDAtMi45ODkgMS4yMzUtMi45ODkgMy4yNzggMCAyLjA0OCAxLjE0MyAzLjI3OCAzLjAyNCAzLjI3OFoiCiAgICAgIC8+CiAgICA8L3N2Zz4=")',
  Hash: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxOCAxOCI+CiAgPHBhdGggZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNiA0LjQ1YzAtLjU1OC4zMTgtLjk1LjgwNi0uOTUuNDg4IDAgLjguMzkyLjguOTVWNi41aDIuNzg5VjQuNDVjMC0uNTU4LjMxNy0uOTUuODA1LS45NS40ODggMCAuOC4zOTIuOC45NVY2LjVoMi4wNWMuNTU4IDAgLjk1LjMxOC45NS44MDYgMCAuNDg4LS4zOTIuOC0uOTUuOEgxMnYyLjc4OWgyLjA1Yy41NTggMCAuOTUuMzE3Ljk1LjgwNSAwIC40ODgtLjM5Mi44LS45NS44SDEydjIuMDQzYzAgLjU1OC0uMzEyLjk1Ny0uOC45NTctLjQ4OCAwLS44MDUtLjM5OS0uODA1LS45NTdWMTIuNWgtMi43OXYyLjA0M2MwIC41NTgtLjMxMS45NTctLjguOTU3LS40ODcgMC0uODA1LS4zOTktLjgwNS0uOTU3VjEyLjVIMy45NTdjLS41NTggMC0uOTU3LS4zMTItLjk1Ny0uOCAwLS40ODguMzk5LS44MDUuOTU3LS44MDVINnYtMi43OUgzLjk1N2MtLjU1OCAwLS45NTctLjMxMS0uOTU3LS44IDAtLjQ4Ny4zOTktLjgwNS45NTctLjgwNUg2VjQuNDVabTEuNjA2IDMuNjU1djIuNzloMi43ODl2LTIuNzloLTIuNzlaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+")',
  Search:
    'url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHdpZHRoPSIxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNy4xOTgyNCAxNC4zOTY1QzguNDgxNDUgMTQuMzk2NSA5LjY4NTU1IDE0LjA1MzcgMTAuNzQwMiAxMy40NTYxTDE0LjA1MzcgMTYuNzc4M0MxNC4zOTY1IDE3LjEyMTEgMTQuODcxMSAxNy4yODgxIDE1LjM0NTcgMTcuMjg4MUMxNi4zNzQgMTcuMjg4MSAxNy4xMzg3IDE2LjQ5NzEgMTcuMTM4NyAxNS40ODYzQzE3LjEzODcgMTUuMDIwNSAxNi45ODA1IDE0LjU2MzUgMTYuNjI4OSAxNC4yMTE5TDEzLjM0MTggMTAuOTI0OEMxNC4wMDk4IDkuODM0OTYgMTQuMzk2NSA4LjU2MDU1IDE0LjM5NjUgNy4xOTgyNEMxNC4zOTY1IDMuMjUxOTUgMTEuMTUzMyAwIDcuMTk4MjQgMEMzLjI1MTk1IDAgMCAzLjI0MzE2IDAgNy4xOTgyNEMwIDExLjE1MzMgMy4yNDMxNiAxNC4zOTY1IDcuMTk4MjQgMTQuMzk2NVpNNy4xOTgyNCAxMS44NjUyQzQuNjIzMDUgMTEuODY1MiAyLjUzMTI1IDkuNzczNDQgMi41MzEyNSA3LjE5ODI0QzIuNTMxMjUgNC42MzE4NCA0LjYyMzA1IDIuNTMxMjUgNy4xOTgyNCAyLjUzMTI1QzkuNzczNDQgMi41MzEyNSAxMS44NjUyIDQuNjMxODQgMTEuODY1MiA3LjE5ODI0QzExLjg2NTIgOS43NzM0NCA5Ljc3MzQ0IDExLjg2NTIgNy4xOTgyNCAxMS44NjUyWiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg+PC9zdmc+)',
  Star: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxOCAxOCI+CiAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTQuODQgMTQuNmMuMzM0LjI1Ny43NS4xNzUgMS4yMDEtLjE1M0w5IDEyLjI3M2wyLjk0NyAyLjE3NGMuNDU3LjMyOC44NzMuNDEgMS4yMDcuMTUzLjMyOC0uMjUyLjM5OS0uNjY4LjIyMy0xLjE4NGwtMS4xNzItMy40NzUgMi45ODItMi4xMzJjLjQ1Mi0uMzIzLjY1LS42OTguNTE2LTEuMDk2LS4xMzUtLjM5My0uNTEtLjU4Ni0xLjA2Ni0uNThsLTMuNjUuMDNMOS44NzIgMi42N2MtLjE3LS41MzMtLjQ1Ny0uODMyLS44NzMtLjgzMi0uNDIyIDAtLjcwOS4yOTktLjg3OS44MzJMNy4wMDggNi4xNjJsLTMuNjU2LS4wM2MtLjU1MS0uMDA1LS45MjYuMTg4LTEuMDYxLjU3NS0uMTM1LjQwNC4wNjQuNzguNTE2IDEuMTAyTDUuNzg5IDkuOTRsLTEuMTcyIDMuNDc1Yy0uMTc2LjUxNi0uMTA1LjkzMi4yMjMgMS4xODRabTEuMzYtMS44NjRjLS4wMTMtLjAxMS0uMDEzLS4wMTctLjAwNy0uMDRsMS4wMi0yLjc4NGMuMTM1LS4zODcuMTE3LS41NjItLjI1Mi0uODAzTDQuNTA2IDcuNDU3Yy0uMDI0LS4wMTgtLjAzNS0uMDMtLjAzLS4wNDEuMDA2LS4wMTIuMDE4LS4wMTguMDQ3LS4wMThsMi45Ni4xMDZjLjQxLjAxMi41NzQtLjA4Mi42OC0uNDhsLjgwOC0yLjg0OGMuMDA2LS4wMy4wMTEtLjA0MS4wMjktLjA0MS4wMTIgMCAuMDE4LjAxMS4wMjMuMDRsLjgwOSAyLjg0OGMuMTA1LjM5OS4yNy40OTMuNjg2LjQ4bDIuOTU5LS4xMDVjLjAyOSAwIC4wNC4wMDYuMDQ2LjAxOCAwIC4wMTItLjAwNS4wMjMtLjAyOS4wNDFsLTIuNDYgMS42NTJjLS4zNy4yNDYtLjM4OC40MTYtLjI1My44MDNsMS4wMiAyLjc4M2MuMDA2LjAyNC4wMDYuMDMgMCAuMDQxLS4wMTIuMDEyLS4wMjQuMDA2LS4wNDctLjAwNmwtMi4zMjYtMS44MzRjLS4zMzQtLjI1Ny0uNTI4LS4yNTctLjg2MiAwTDYuMjQgMTIuNzNjLS4wMjMuMDEyLS4wMzUuMDE4LS4wNC4wMDZaIi8+Cjwvc3ZnPg==")',
};

globalStyle('.DocSearch-Container', {
  backdropFilter: 'blur(4px)',
  backgroundColor: vars.colors.backgroundScrim,
  height: '100vh',
  left: 0,
  padding: `0 ${vars.space[4]}`,
  position: 'fixed',
  top: 0,
  width: '100vw',
  zIndex: 200,
});

globalStyle('.DocSearch-Modal', {
  backgroundColor: vars.colors.accent,
  borderRadius: vars.radii[3],
  margin: '8vh auto',
  maxHeight: 'calc(100vh - 16vh)',
  maxWidth: '640px',
  overflow: 'auto',
});

globalStyle('.DocSearch-Modal, .DocSearch-Modal button', {
  fontFamily: vars.fonts.normal,
});

globalStyle('.DocSearch-LoadingIndicator', {
  display: 'none',
  height: 18,
  width: 18,
});

globalStyle('.DocSearch-Container--Stalled .DocSearch-LoadingIndicator', {
  display: 'block',
});

globalStyle('.DocSearch-Reset', {
  display: 'none',
});

globalStyle('.DocSearch-SearchBar', {
  alignItems: 'center',
  borderBottom: `1px solid ${vars.colors.separator}`,
  display: 'flex',
  padding: `0 ${vars.space[5]}`,
});

globalStyle('.DocSearch-Form', {
  alignItems: 'center',
  display: 'flex',
  flex: 1,
});

globalStyle('.DocSearch-MagnifierLabel', {
  backgroundImage: Icon.Search,
  display: 'block',
  flexShrink: 0,
  height: 18,
  width: 18,
});

globalStyle('.DocSearch-Container--Stalled .DocSearch-MagnifierLabel', {
  display: 'none',
});

globalStyle('.DocSearch-MagnifierLabel svg', {
  display: 'none',
});

globalStyle('.DocSearch-VisuallyHiddenForAccessibility', {
  display: 'none',
});

globalStyle('.DocSearch-Input', {
  backgroundColor: 'transparent',
  border: 'none',
  flex: 1,
  fontFamily: vars.fonts.normal,
  fontSize: vars.fontSizes[3],
  marginLeft: vars.space[5],
  marginRight: vars.space[5],
  outline: 'none',
  padding: `${vars.space[6]} 0`,
});

globalStyle(
  '.DocSearch-Input::-webkit-search-cancel-button,.DocSearch-Input::-webkit-search-decoration,.DocSearch-Input::-webkit-search-results-button,.DocSearch-Input::-webkit-search-results-decoration',
  {
    display: 'none',
  },
);

globalStyle('.DocSearch-Cancel', {
  backgroundColor: vars.colors.fillSecondary,
  backgroundImage: Icon.Esc,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '24px 12px',
  border: 'none',
  borderRadius: vars.radii[1],
  boxShadow: '0 0 0 1px #e3e3e9, 0px 1px 5px rgb(0 0 0 / 8%)',
  cursor: 'pointer',
  fontSize: 0,
  height: 20,
  width: 32,
});

globalStyle('.DocSearch-Footer', {
  alignItems: 'center',
  borderTop: `1px solid ${vars.colors.separator}`,
  display: 'flex',
  padding: `${vars.space[5]}`,
});

globalStyle('.DocSearch-Commands', {
  display: 'none',
});

globalStyle('.DocSearch-Logo', {
  marginLeft: 'auto',
});

globalStyle('.DocSearch-Logo a', {
  alignItems: 'center',
  color: vars.colors.labelQuaternary,
  display: 'flex',
  fontFamily: vars.fonts.normal,
  fontSize: vars.fontSizes[2],
  textDecoration: 'none',
});

globalStyle('.DocSearch-Logo a svg', {
  color: vars.colors.purple,
  marginLeft: vars.space[3],
});

globalStyle('.DocSearch-StartScreen .DocSearch-Help', {
  color: vars.colors.labelSecondary,
  fontSize: vars.fontSizes[3],
  padding: `${vars.space[9]} ${vars.space[5]}`,
  textAlign: 'center',
});

globalStyle('.DocSearch-NoResults', {
  padding: `${vars.space[9]} ${vars.space[5]}`,
});

globalStyle('.DocSearch-NoResults .DocSearch-Screen-Icon', {
  display: 'none',
});

globalStyle('.DocSearch-NoResults .DocSearch-Title', {
  color: vars.colors.labelSecondary,
  fontSize: vars.fontSizes[3],
  marginBottom: vars.space[10],
  textAlign: 'center',
});

globalStyle('.DocSearch-NoResults .DocSearch-Title strong', {
  color: vars.colors.label,
  fontWeight: 400,
  textAlign: 'center',
});

globalStyle('.DocSearch-Hit--Result .DocSearch-Hit-icon', {
  backgroundImage: Icon.Hash,
  height: 18,
  marginRight: vars.space[4],
  opacity: 0.5,
  width: 18,
});

globalStyle('.DocSearch-Hit--Parent .DocSearch-Hit-icon', {
  backgroundImage: Icon.Book,
});

globalStyle('.DocSearch-Hit--Result .DocSearch-Hit-action', {
  backgroundImage: Icon.ChevronRight,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '7px 12px',
  display: 'flex',
  height: 28,
  opacity: 0.5,
  width: 28,
});

globalStyle(
  '.DocSearch-Hit[aria-selected=true] .DocSearch-Hit--Result .DocSearch-Hit-action',
  {
    opacity: 1,
  },
);

globalStyle('.DocSearch-Hit--Result .DocSearch-Hit-action svg', {
  display: 'none',
});

globalStyle('.DocSearch-Hits ul', {
  listStyle: 'none',
  padding: 0,
});

globalStyle('.DocSearch-Hit-source', {
  color: vars.colors.labelTertiary,
  fontSize: vars.fontSizes[2],
  fontWeight: 600,
  margin: `${vars.space[8]} ${vars.space[5]} ${vars.space[5]} ${vars.space[9]}`,
});

globalStyle('.DocSearch-Hit', {
  color: vars.colors.labelSecondary,
  margin: 0,
});

globalStyle('.DocSearch-Hit a', {
  borderRadius: vars.radii[3],
  color: vars.colors.label,
  display: 'block',
  margin: `0 ${vars.space[5]}`,
  padding: `${vars.space[3]} ${vars.space[5]}`,
  textDecoration: 'none',
});

globalStyle('.DocSearch-Hit[aria-selected=true] a', {
  backgroundColor: vars.colors.blue,
  color: vars.colors.accent,
});

globalStyle(
  '.DocSearch-Hit[aria-selected=true] .DocSearch-Hit-icon, .DocSearch-Hit[aria-selected=true] .DocSearch-Hit-action',
  {
    filter: 'invert(1)',
  },
);

globalStyle('.DocSearch-Hit-Container', {
  alignItems: 'center',
  display: 'flex',
});

globalStyle('.DocSearch-Hit-Tree, .DocSearch-Hit-icon svg', {
  display: 'none',
});

globalStyle('.DocSearch-Hit-content-wrapper', {
  alignItems: 'flex-start',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

globalStyle('.DocSearch-Hit-content-wrapper mark', {
  backgroundColor: 'transparent',
  color: 'inherit',
});

globalStyle('.DocSearch-Hit-content-wrapper .DocSearch-Hit-title mark', {
  fontWeight: 700,
});

globalStyle('.DocSearch-Hit-content-wrapper .DocSearch-Hit-path:empty', {
  display: 'none',
});

globalStyle('.DocSearch-Hit-content-wrapper .DocSearch-Hit-path', {
  borderRadius: vars.radii.round,
  color: vars.colors.labelTertiary,
  fontSize: vars.fontSizes[2],
  marginTop: vars.space[2],
  whiteSpace: 'nowrap',
});

globalStyle('.DocSearch-Hit[aria-selected=true] .DocSearch-Hit-path', {
  color: vars.colors.accent,
});

globalStyle('.DocSearch-Hit-action', {
  marginLeft: vars.space[3],
});

globalStyle('.DocSearch-Hit-action-button', {
  backgroundColor: 'transparent',
  border: 'none',
});

globalStyle('.DocSearch-Hit-action-button[title="Save this search"]', {
  backgroundImage: Icon.Star,
});
globalStyle(
  '.DocSearch-Hit-action-button[title="Remove this search from history"]',
  {
    backgroundImage: Icon.Close,
  },
);

globalStyle(
  '.DocSearch-Hit-action-button[title="Save this search"], .DocSearch-Hit-action-button[title="Remove this search from history"]',
  {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '18px',
    display: 'flex',
    height: 28,
    padding: 0,
    width: 28,
  },
);

globalStyle(
  '.DocSearch-Hit-action-button[title="Save this search"] svg, .DocSearch-Hit-action-button[title="Remove this search from history"] svg',
  { display: 'none' },
);

globalStyle('.DocSearch-NoResults-Prefill-List .DocSearch-Help', {
  color: vars.colors.labelTertiary,
  fontSize: vars.fontSizes[2],
  fontWeight: 600,
});

globalStyle('.DocSearch-Hit--Result.DocSearch-Hit--Child', {
  display: 'block',
  marginLeft: vars.space[8],
});

globalStyle('.DocSearch-NoResults-Prefill-List ul', {
  listStyle: 'none',
  padding: 0,
});

globalStyle('.DocSearch-NoResults-Prefill-List button', {
  backgroundColor: vars.colors.fillSecondary,
  border: 'none',
  borderRadius: vars.radii[3],
  color: vars.colors.label,
  display: 'block',
  fontSize: vars.fontSizes[3],
  fontWeight: 600,
  marginBottom: vars.space[2],
  paddingBottom: vars.space[3],
  paddingLeft: vars.space[5],
  paddingRight: vars.space[5],
  paddingTop: vars.space[3],
});

globalStyle('.DocSearch-NoResults-Prefill-List button:hover', {
  backgroundColor: vars.colors.blue,
  color: vars.colors.accent,
});
