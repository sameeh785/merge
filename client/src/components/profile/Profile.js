import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProfileById } from "../../actions/profile";
import { connect } from "react-redux";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
import ProfileEducation from "./Profileeducation";

const Profile = ({
  getProfileById,
  auth,
  match,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null && loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Go Back to Profile
          </Link>
          {auth.isAuthenticated &&
            auth.loading &&
            auth.user_id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div class="profile-grid my-1">
            {profile ? <ProfileTop profile={profile} /> : <Spinner />}
            {profile ? <ProfileAbout profile={profile} /> : <Spinner />}
            <div class="profile-exp bg-white p-2">
              <h2 class="text-primary">Experience</h2>
              {profile?.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((item) => {
                    return (
                      <ProfileExperience key={item._id} experience={item} />
                    );
                  })}
                </Fragment>
              ) : (
                <h2> No Experience Credentials</h2>
              )}
            </div>

            <div class="profile-edu bg-white p-2">
              <h2 class="text-primary">Education</h2>
              {profile?.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((item) => {
                    return <ProfileEducation key={item._id} education={item} />;
                  })}
                </Fragment>
              ) : (
                <h2> No Experience Credentials</h2>
              )}
            </div>
            {profile?.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    return {
      profile: state.profile,
      auth: state.auth,
    };
  },
  { getProfileById }
)(Profile);
