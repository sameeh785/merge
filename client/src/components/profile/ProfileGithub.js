import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { conenct, connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGithubRepos } from "../../actions/profile";
const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() =>{
    console.log('asaaaaaaaaaaaaaaaaaaaaaaaa')
    getGithubRepos(username);
    
  }, [getGithubRepos, username]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => {
          return (
            <div key={repo._id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  {" "}
                  <a href={repo.html_url} target="_blank">
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars : {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers : {repo.watchers_count}
                  </li>
                  <li className="badge badge-light">
                    Folk : {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
};

export default connect(
  (state) => {
    return {
      repos: state.profile.repos,
    };
  },
  { getGithubRepos }
)(ProfileGithub);
