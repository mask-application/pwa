import React, { useState } from 'react';
import '../../MyActivitiesStyle.scss';
import help from './help';

const helpQrCode = 0;
const helpCamera = 1;

const helpGuide = ['qr-code', 'camera'];

function MyActivitiesHelp() {
  const [helpId, setHelpId] = useState(0);

  return (
    <>
      {localStorage.getItem('help-my-activity-visited') !== 'true' ? (
        <>
          <div
            className={
              helpId === helpQrCode || helpId === helpCamera
                ? `overlay-help overlay-${helpGuide[helpId]}`
                : ''
            }
          />
          {helpId === helpQrCode || helpId === helpCamera ? (
            <div className="header-help">
              <p className="header-help-text">{help.msg[helpId]}</p>
              <button
                className="btn-accept"
                onClick={() => {
                  if (helpId === helpCamera)
                    localStorage.setItem('help-my-activity-visited', 'true');
                  setHelpId(helpId + 1);
                }}
              >
                {/*TODO: use formatted message*/}
                <h1>تأیید</h1>
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default MyActivitiesHelp;
