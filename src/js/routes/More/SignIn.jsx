import React, { Component } from "react";
import FacebookActions from "../../actions/FacebookActions";
import FacebookStore from "../../stores/FacebookStore";
import FacebookSignIn from "../../components/Facebook/FacebookSignIn";
import Main from "../../components/Facebook/Main";
import LoadingWheel from "../../components/LoadingWheel";
import VoterStore from "../../stores/VoterStore";

const debug_mode = false;
export default class SignIn extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    this._onVoterStoreChange();
    this.facebookListener = FacebookStore.addListener(this._onFacebookChange.bind(this));
    this.listener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
  }

  componentWillUnmount () {
    this.listener.remove();
    this.facebookListener.remove();
  }

  _onVoterStoreChange () {
    this.setState({ voter: VoterStore.voter() });
  }

  _onFacebookChange () {
    this.setState({ fb_state: this.getFacebookState() });
  }

  getFacebookState () {
    return {
      accessToken: FacebookStore.accessToken,
      facebookIsLoggedIn: FacebookStore.loggedIn,
      userId: FacebookStore.userId,
      facebookPictureStatus: FacebookStore.facebookPictureStatus,
      facebookPictureUrl: FacebookStore.facebookPictureUrl
    };
  }

  render () {
    var { voter} = this.state;
    if (!voter){
      return LoadingWheel;
    }

    return <div className="">
      <div className="bs-container-fluid bs-well u-gutter-top--small fluff-full1">
        <h3 className="bs-text-center">{voter.signed_in_personal ? <span>My Account</span> : <span>Sign In</span>}</h3>
        <div className="bs-text-center">
          {voter.signed_in_facebook ?
            <span><a className="bs-btn btn-social bs-btn-lg btn-facebook" onClick={FacebookActions.appLogout}>
            <i className="fa fa-facebook"></i>Sign Out</a></span> : <FacebookSignIn />
          }
          {/*
          <div>
            <Link to="add_friends_confirmed" className="bs-btn btn-social bs-btn-lg btn-twitter">
              <i className="fa fa-twitter"></i>Sign in with Twitter
            </Link>
          </div>
          <div>
            <Link to="add_friends_confirmed" className="bs-btn btn-social bs-btn-lg btn-google">
              <i className="fa fa-google"></i>Sign in with Google
            </Link>
          </div>
          */}
        </div>
        <br />
        <br />
        {/*
        <div className="bs-text-center">
          {voter.signed_in_facebook ? <FacebookDisconnect /> : null}
        </div>
        */}

        {debug_mode &&
        <div className="bs-text-center">
          signed_in_personal: {voter.signed_in_personal ? <span>True</span> : null}<br />
          signed_in_facebook: {voter.signed_in_facebook ? <span>True</span> : null}<br />
          signed_in_twitter: {voter.signed_in_twitter ? <span>True</span> : null}<br />
          we_vote_id: {voter.we_vote_id ? <span>{voter.we_vote_id}</span> : null}<br />
          email: {voter.email ? <span>{voter.email}</span> : null}<br />
          facebook_email: {voter.facebook_email ? <span>{voter.facebook_email}</span> : null}<br />
          facebook_profile_image_url_https: {voter.facebook_profile_image_url_https ? <span>{voter.facebook_profile_image_url_https}</span> : null}<br />
          first_name: {voter.first_name ? <span>{voter.first_name}</span> : null}<br />
          facebook_id: {voter.facebook_id ? <span>{voter.facebook_id}</span> : null}<br />
        </div>
      }
      </div>
      {/* FOR DEBUGGING */}
      <Main />

    </div>;
  }
}
