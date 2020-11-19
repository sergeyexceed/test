import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
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
import * as projectActions from "../../store/actions/projects";
import * as structureActions from "../../store/actions/structure";
import links from "../../config/links";
import { createLink } from "../../utils/links";
import styles from "./style";

class LoginComponent extends Component {
  static propTypes = {
    history: PropTypes.object,
    auth: PropTypes.object,
    projects: PropTypes.object,
    structureActions: PropTypes.object,
    projectActions: PropTypes.object,
    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    auth: {},
    projects: {},
    structureActions: {},
    projectActions: {},
  };

  handleProjectStructure(projectId, structureId) {
    this.props.history.push(
      createLink("structure", { projectId, structureId })
    );
  }

  componentDidMount() {
    this.props.projectActions.getProjects();
    this.props.structureActions.resetBreadcrumbs();
  }

  renderProjectList(projects) {
    const { classes } = this.props;
    const badgeProps = {
      color: "secondary",
      children: <MailIcon />,
    };

    return projects.map((project) => (
      <ListItem
        key={project.id}
        className={classes.listItem}
        onClick={() =>
          this.handleProjectStructure(project.id, project.root_structure_id)
        }
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={project.title} />
        <Badge
          className={`${classes.badgeDanger} ${classes.badge}`}
          badgeContent={project.notes_cnt_danger}
          {...badgeProps}
        />
        <Badge
          className={`${classes.badgeSuccess} ${classes.badge}`}
          badgeContent={project.notes_cnt_success}
          {...badgeProps}
        />
        <Badge
          className={`${classes.badgeWarning} ${classes.badge}`}
          badgeContent={project.notes_cnt_warning}
          {...badgeProps}
        />
      </ListItem>
    ));
  }

  render() {
    const { classes } = this.props;
    const { auth, projects } = this.props;

    if (!auth.token) {
      return <Redirect to={links.login} />;
    }

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
            {projects.data.length && (
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  Projects
                </Typography>
                <div>
                  <List className={classes.list}>
                    {this.renderProjectList(projects.data)}
                  </List>
                </div>
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
    auth: state.auth,
    projects: state.projects,
  }),
  (dispatch) => ({
    structureActions: bindActionCreators(structureActions, dispatch),
    projectActions: bindActionCreators(projectActions, dispatch),
  })
)(LoginComponent);

export default withStyles(styles)(Login);
