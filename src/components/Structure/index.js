import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import * as structureActions from "../../store/actions/structure";
import styles from "./style";
import { createLink } from "../../utils/links";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.projectId = this.props.match.params.projectId;
    this.structureId = this.props.match.params.structureId;
  }

  static propTypes = {
    match: PropTypes.object,
    structure: PropTypes.object,
    breadcrumbs: PropTypes.object,
    structureActions: PropTypes.object,
    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    structure: {},
    breadcrumbs: {},
    structureActions: {},
  };

  handleProjectStructure(projectId, structureId, title) {
    const { breadcrumbs } = this.props;
    this.props.structureActions.setBreadcrumbs({
      projectId,
      structureId,
      title,
      index: breadcrumbs.length,
    });
    this.props.structureActions.getProjectStructre(projectId, structureId);
    this.props.history.push(
      createLink("structure", { projectId, structureId })
    );
  }

  handleNavigate = ({ projectId, structureId, index }) => {
    this.props.structureActions.removeBreadcrumbs(index);
    this.props.structureActions.getProjectStructre(projectId, structureId);
    this.props.history.push(
      createLink("structure", { projectId, structureId })
    );
  };

  renderBreaccrumbs = () => {
    const { breadcrumbs } = this.props;

    return breadcrumbs.length > 1 ? (
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((value) => (
          <Link color="inherit" onClick={() => this.handleNavigate(value)}>
            {value.title}
          </Link>
        ))}
      </Breadcrumbs>
    ) : null;
  };

  renderProjectList(structureChildrens) {
    const { classes } = this.props;
    const badgeProps = {
      color: "secondary",
      children: <MailIcon />,
    };

    return structureChildrens.map((children) => (
      <ListItem
        key={children.id}
        className={classes.listItem}
        onClick={() =>
          this.handleProjectStructure(
            children.project_id,
            children.id,
            children.title
          )
        }
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={children.title} />
        <Badge
          className={`${classes.badgeDanger} ${classes.badge}`}
          badgeContent={children.notes_cnt_danger}
          {...badgeProps}
        />
        <Badge
          className={`${classes.badgeSuccess} ${classes.badge}`}
          badgeContent={children.notes_cnt_success}
          {...badgeProps}
        />
        <Badge
          className={`${classes.badgeWarning} ${classes.badge}`}
          badgeContent={children.notes_cnt_warning}
          {...badgeProps}
        />
      </ListItem>
    ));
  }

  componentDidMount() {
    if (this.projectId && this.structureId) {
      this.props.structureActions.getProjectStructre(
        this.projectId,
        this.structureId
      );
    }
  }

  render() {
    const { classes, breadcrumbs, structure } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Typography
            component="div"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#cfe8fc",
              height: "100vh",
              padding: "30px",
            }}
          >
            {this.renderBreaccrumbs()}
            {structure && (
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  {structure.title}
                </Typography>
                {structure.children && (
                  <div>
                    <List className={classes.list}>
                      {this.renderProjectList(structure.children)}
                    </List>
                  </div>
                )}
              </Grid>
            )}
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

const Login = connect(
  (state) => ({
    structure: state.structure.data,
    breadcrumbs: state.structure.breadcrumbs,
  }),
  (dispatch) => ({
    structureActions: bindActionCreators(structureActions, dispatch),
  })
)(LoginComponent);

export default withStyles(styles)(Login);
