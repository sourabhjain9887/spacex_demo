import React, { useState, useEffect } from "react";
import { SiNasa } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import { FaWikipediaW } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import "./MissionDetailsModal.css";

const MissionDetailsModal = ({ closeModal, data }) => {
  const [paragraph, setParagraph] = useState("");
  const [dataDisplay, setDataDisplay] = useState(false);

  //   const fetchData = async () => {
  //     const link = `${data.mission_id[0]}`;
  //     console.log(link);
  //     const url = `https://api.spacexdata.com/v3/missions/${link}`;
  //     console.log(url);
  //     const moddata = await axios.get(`${url}`);
  //     console.log(moddata.data.description);
  //     // fetch(`${url}`).then((response) => {
  //     //   console.log(response);
  //     //   return response.json();
  //     // });
  //     //   .then((data) => {
  //     //     setParagraph(data.body);
  //     //   });
  //   };

  useEffect(() => {
    // fetchData();
    let modifiedparagraph = data.details;
    // console.log(modifiedparagraph);

    if (modifiedparagraph != null && modifiedparagraph.length > 0) {
      modifiedparagraph = modifiedparagraph.substring(0, 146);
      modifiedparagraph = modifiedparagraph.concat("...");
      // console.log(modifiedparagraph);
      //   setParagraph(...modifiedparagraph, modifiedparagraph.concat("..."));
      setParagraph(modifiedparagraph);
      setDataDisplay(true);
    } else {
      const tempData = `${data.rocket.rocket_name} is a reusable, two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of people and payloads into Earth orbit and beyond. ${data.rocket.rocket_name} is the world’s first...`;
      // setParagraph(data.details);
      setParagraph(tempData);
      setDataDisplay(true);
    }
  }, []);

  let launch = data.launch_date_local || "";
  // 2006-03-25T10:30:00+12:00
  let year = launch.substring(0, 4);
  let month = Number(launch.substring(5, 7)) - 1;
  // console.log(data.flight_number)
  // console.log(orbit.orbit);
  // console.log(paragraph);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  month = months[month];
  let date = launch.substring(8, 10);
  let time = launch.substring(11, 16);

  //   console.log("in mission details component");
  //   console.log(closeModal);
  console.log(data);
  const demo = `${data.rocket.second_stage.payloads[0].manufacturer}`;
  //   console.log(demo);
  return (
    <div className="modalBack">
      <div className="modalbody">
        <div className="closebutton">
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="headerdata">
          <div>
            <img
              style={{ width: 55 }}
              src={
                (data && data.links && data.links.mission_patch_small) ||
                "https://iconape.com/wp-content/files/ut/110968/svg/united-states-space-force.svg"
              }
            ></img>
          </div>
          <div className="headernames">
            <div style={{ fontSize: 16 }}>
              <b>{data.mission_name}</b>
            </div>
            <div style={{ fontSize: 11, color: "rgb(151, 151, 151)" }}>
              {data.rocket.rocket_name}
            </div>
            <div className="links">
              <a
                href={
                  (data && data.links && data.links.article_link) ||
                  "https://www.nasa.gov/"
                }
              >
                <SiNasa />
              </a>
              <a
                href={
                  (data && data.links && data.links.wikipedia) ||
                  "https://www.spacex.com/"
                }
              >
                <FaWikipediaW />
              </a>
              <a
                href={
                  (data && data.links && data.links.video_link) ||
                  "https://www.youtube.com/"
                }
              >
                <FiYoutube />
              </a>
            </div>
          </div>
          <div>
            {data.launch_success === true ? (
              <span className="success">Success</span>
            ) : data.launch_success === false ? (
              <span className="failed">Failed</span>
            ) : (
              data.launch_success === null && (
                <span className="upcoming">Upcoming</span>
              )
            )}
          </div>
        </div>
        <p>
          {dataDisplay && paragraph}
          <a
            href={
              (data && data.links && data.links.wikipedia) ||
              "https://www.spacex.com/"
            }
          >
            Wikipedia
          </a>
        </p>
        <div className="tabledata">
          <table>
            <tbody>
              <tr>
                <td>Flight Number</td>
                <td>{data.flight_number}</td>
              </tr>
              <tr>
                <td>Mission Name</td>
                <td>{data.mission_name}</td>
              </tr>
              <tr>
                <td>Rocket Type</td>
                <td>{data.rocket.rocket_type}</td>
              </tr>
              <tr>
                <td>Rocket Name</td>
                <td>{data.rocket.rocket_name}</td>
              </tr>
              <tr>
                <td>Manufacturar</td>
                <td>{data.rocket.second_stage.payloads[0].manufacturer}</td>
              </tr>
              <tr>
                <td>Nationality</td>
                <td>{data.rocket.second_stage.payloads[0].nationality}</td>
              </tr>
              <tr>
                <td>Launch Date</td>
                <td>
                  {month && year && time && `${date} ${month} ${year} ${time}`}
                </td>
              </tr>
              <tr>
                <td>Payload Type</td>
                <td>{data.rocket.second_stage.payloads[0].payload_type}</td>
              </tr>
              <tr>
                <td>Orbit</td>
                <td>{data.rocket.second_stage.payloads[0].orbit}</td>
              </tr>
              <tr>
                <td>Launch Site</td>
                <td>{data.launch_site.site_name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>{" "}
    </div>
  );
};

export default MissionDetailsModal;
