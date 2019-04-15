import React from "react";
import { Link } from "react-router-dom";

// import {
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   CardTitle,
//   Col,
//   Container,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   Media,
//   Row,
//   UncontrolledDropdown
// } from "reactstrap";

import { Home, MessageSquare, MoreHorizontal } from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faGraduationCap,
  faBook,
  faUniversity,
  faClock,
  faBriefcase,
  faBuilding
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";

import avatar1 from "../avatars/avatar.jpg";
import avatar2 from "../avatars/avatar-2.jpg";
import avatar4 from "../avatars/avatar-4.jpg";
import avatar5 from "../avatars/avatar-5.jpg";

import unsplash1 from "../img/unsplash-1.jpg";
import unsplash2 from "../img/unsplash-2.jpg";

const ProfileDetails = () => (
  <div className="card">
    <div className="card-header">
      <h5 className="card-title mb-0">Profile Details</h5>
    </div>
    <div className="card-body text-center">
      <img
        src={avatar4}
        alt="Stacie Hall"
        className="img-fluid rounded-circle mb-2"
        // width="128"
        // height="128"
        style={{ width: "132px", height: "132px" }}
      />
      <h5 className="card-title mb-0">Stacie Hall</h5>
      <div className="text-muted mb-2">Full Stack Developer</div>

      <div>
        <button className="btn btn-primary btn-sm mr-1">Follow</button>
        <button className="btn btn-primary btn-sm" size="sm" color="primary">
          <MessageSquare width={16} height={16} /> Message
        </button>
      </div>
    </div>

    <hr className="my-0" />

    <div className="card-body">
      <h5 className="card-title">Skills</h5>
      <span className="badge badge-primary mr-1 my-1">HTML</span>
      <span className="badge badge-primary mr-1 my-1">JavaScript</span>
      <span className="badge badge-primary mr-1 my-1">Sass</span>
      <span className="badge badge-primary mr-1 my-1">Angular</span>
      <span className="badge badge-primary mr-1 my-1">Vue</span>
      <span className="badge badge-primary mr-1 my-1">React</span>
      <span className="badge badge-primary mr-1 my-1">Redux</span>
      <span className="badge badge-primary mr-1 my-1">UI</span>
      <span className="badge badge-primary mr-1 my-1">UX</span>
    </div>

    <hr className="my-0" />
    <div className="card-body">
      <h5 className="card-title">About</h5>
      <ul className="list-unstyled mb-0">
        <li className="mb-1">
          <Home width={14} height={14} className="mr-1" /> Lives in{" "}
          <Link to="/dashboard/default">Toronto, ON</Link>
        </li>
      </ul>
    </div>

    <hr className="my-0" />
    <div className="card-body">
      <h5 className="card-title">Bio</h5>
      <ul className="list-unstyled mb-0">
        <li className="mb-1">
          <FontAwesomeIcon icon={faUser} fixedWidth className="mr-1" />
          Software Magician
        </li>
      </ul>
    </div>

    <hr className="my-0" />
    <div className="card-body">
      <h5 className="card-title">Education</h5>
      <ul className="list-unstyled mb-0">
        <li className="mb-1">
          <FontAwesomeIcon icon={faGraduationCap} fixedWidth className="mr-1" />
          Honours in Bachelor of Science
        </li>

        <li className="mb-1">
          <FontAwesomeIcon icon={faBook} fixedWidth className="mr-1" />
          Computer Science
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faUniversity} fixedWidth className="mr-1" />

          <Link to="/dashboard/default">University of Toronto</Link>
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faClock} fixedWidth className="mr-1" />
          2016/09/01 - 2020/04/01
        </li>
      </ul>
    </div>

    <hr className="my-0" />
    <div className="card-body">
      <h5 className="card-title">Experience</h5>
      <ul className="list-unstyled mb-0">
        <li className="mb-1">
          <FontAwesomeIcon icon={faBriefcase} fixedWidth className="mr-1" />
          Full Stack Web Developer{" "}
        </li>

        <li className="mb-1">
          <FontAwesomeIcon icon={faBuilding} fixedWidth className="mr-1" />
          At <Link to="/dashboard/default">GitHub</Link>
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faClock} fixedWidth className="mr-1" />
          2018/06/01 - 2018-08/31
        </li>
      </ul>
    </div>

    <hr className="my-0" />
    <div className="card-body">
      <h5 className="card-title">Elsewhere</h5>

      <ul className="list-unstyled mb-0">
        <li className="mb-1">
          <FontAwesomeIcon icon={faGlobe} fixedWidth className="mr-1" />
          <Link to="/dashboard/default">staciehall.co</Link>
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faTwitter} fixedWidth className="mr-1" />
          <Link to="/dashboard/default">Twitter</Link>
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faFacebook} fixedWidth className="mr-1" />
          <Link to="/dashboard/default">Facebook</Link>
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faInstagram} fixedWidth className="mr-1" />
          <Link to="/dashboard/default">Instagram</Link>
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faLinkedin} fixedWidth className="mr-1" />
          <Link to="/dashboard/default">LinkedIn</Link>
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faYoutube} fixedWidth className="mr-1" />
          <Link to="/dashboard/default">Youtube</Link>
        </li>
      </ul>
    </div>
  </div>
);

const Activities = () => (
  <div className="card">
    <div className="card-header">
      <div className="card-actions float-right">
        <div className="btn-group">
          <a
            className="dropdown-toggle"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            href="localhost:3000"
          >
            <MoreHorizontal />
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-item">Action</div>
            <div className="dropdown-item">Another Action</div>
            <div className="dropdown-item">Something else here</div>
          </div>
        </div>
      </div>
      <h5 className="card-title mb-0">Activities</h5>
    </div>
    <div className="card-body">
      <div className="media">
        <img
          src={avatar5}
          //   width="36"
          //   height="36"
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle mr-2"
          alt="Ashley Briggs"
        />
        <div className="media-body">
          <small className="float-right text-navy">5m ago</small>
          <strong>Ashley Briggs</strong> started following{" "}
          <strong>Stacie Hall</strong>
          <br />
          <small className="text-muted">Today 7:51 pm</small>
          <br />
        </div>
      </div>

      <hr />
      <div className="media">
        <img
          src={avatar4}
          //   width="36"
          //   height="36"
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle mr-2"
          alt="Ashley Briggs"
        />
        <div className="media-body">
          <small className="float-right text-navy">5m ago</small>
          <strong>Stacie Hall</strong> Posted <br />
          <small className="text-muted">Today 7:51 pm</small>
          <br />
          <strong>Hi Everyone!</strong>
        </div>
      </div>

      <hr />
      <div className="media">
        <img
          src={avatar1}
          //   width="36"
          //   height="36"
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle mr-2"
          alt="Chris Wood"
        />
        <div className="media-body">
          <small className="float-right text-navy">30m ago</small>
          <strong>Chris Wood</strong> posted something on{" "}
          <strong>Stacie Hall</strong>'s timeline
          <br />
          <small className="text-muted">Today 7:21 pm</small>
          <div className="border text-sm text-muted p-2 mt-1">
            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
            quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam
            quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
            Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus. Nullam quis ante.
          </div>
          <button className="btn btn-danger btn-sm mt-1">
            <FontAwesomeIcon icon={faHeart} fixedWidth /> Like
          </button>
        </div>
      </div>

      <hr />
      <div className="media">
        <img
          src={avatar4}
          //   width="36"
          //   height="36"
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle mr-2"
          alt="Stacie Hall"
        />
        <div className="media-body">
          <small className="float-right text-navy">1h ago</small>
          <strong>Stacie Hall</strong> posted a new blog
          <br />
          <small className="text-muted">Today 6:35 pm</small>
        </div>
      </div>

      <hr />
      <div className="media">
        <img
          src={avatar2}
          //   width="36"
          //   height="36"
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle mr-2"
          alt="Carl Jenkins"
        />
        <div className="media-body">
          <small className="float-right text-navy">3h ago</small>
          <strong>Carl Jenkins</strong> posted two photos on{" "}
          <strong>Stacie Hall</strong>'s timeline
          <br />
          <small className="text-muted">Today 5:12 pm</small>
          <div className="row no-gutters mt-1">
            <div className="col-6 col-md-4 col-lg-4 col-xl-3">
              <img src={unsplash1} className="img-fluid pr-2" alt="Unsplash" />
            </div>
            <div className="col-6 col-md-4 col-lg-4 col-xl-3">
              <img src={unsplash2} className="img-fluid pr-2" alt="Unsplash" />
            </div>
          </div>
          <button className="btn btn-danger btn-sm mt-1">
            <FontAwesomeIcon icon={faHeart} fixedWidth /> Like
          </button>
        </div>
      </div>

      <hr />
      <div className="media">
        <img
          src={avatar2}
          //   width="36"
          //   height="36"
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle mr-2"
          alt="Carl Jenkins"
        />
        <div className="media-body">
          <small className="float-right text-navy">1d ago</small>
          <strong>Carl Jenkins</strong> started following{" "}
          <strong>Stacie Hall</strong>
          <br />
          <small className="text-muted">Yesterday 3:12 pm</small>
          <div className="media mt-1">
            <img
              src={avatar4}
              //   width="36"
              //   height="36"
              style={{ width: "40px", height: "40px" }}
              className="rounded-circle mr-2"
              alt="Stacie Hall"
            />
            <div className="media-body pl-3">
              <div className="border text-sm text-muted p-2 mt-1">
                Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id,
                lorem. Maecenas nec odio et ante tincidunt tempus.
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="media">
        <img
          src={avatar4}
          //   width="36"
          //   height="36"
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle mr-2"
          alt="Stacie Hall"
        />
        <div className="media-body">
          <small className="float-right text-navy">1d ago</small>
          <strong>Stacie Hall</strong> posted a new blog
          <br />
          <small className="text-muted">Yesterday 2:43 pm</small>
        </div>
      </div>

      <hr />
      <div className="media">
        <img
          src={avatar1}
          //   width="36"
          //   height="36"
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle mr-2"
          alt="Chris Wood"
        />
        <div className="media-body">
          <small className="float-right text-navy">1d ago</small>
          <strong>Chris Wood</strong> started following{" "}
          <strong>Stacie Hall</strong>
          <br />
          <small className="text-muted">Yesterdag 1:51 pm</small>
        </div>
      </div>

      <hr />
      <button className="btn btn-primary btn-block">Load more</button>
    </div>
  </div>
);

const Profile = () => (
  <div className="container-fluid p-0">
    <h1 className="h3 mb-3">Profile</h1>

    <div className="row">
      <div className="col-md-4 col-xl-3">
        <ProfileDetails />
      </div>
      <div className="col-md-8 col-xl-9">
        <Activities />
      </div>
    </div>
  </div>
);

export default Profile;
