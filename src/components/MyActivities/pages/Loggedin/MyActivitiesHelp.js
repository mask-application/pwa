import React, { useState } from 'react';
import '../../MyActivitiesStyle.scss';
import help from './help';

const helpBluetooth = 0;
const helpQrCode = 1;
const helpCamera = 2;

const helpGuide = ['bluetooth', 'qr-code', 'camera'];

function MyActivitiesHelp() {
  const [helpId, setHelpId] = useState(0);

  return (
    <>
      {localStorage.getItem('help-my-activity-visited') !== 'true' ||
      localStorage.getItem('help-bluetooth-visited') !== 'true' ? (
        <>
          <div
            className={
              helpId === helpQrCode ||
              helpId === helpCamera ||
              helpId === helpBluetooth
                ? `overlay-help overlay-${helpGuide[helpId]}`
                : ''
            }
          />
          {helpId === helpQrCode ||
          helpId === helpCamera ||
          helpId === helpBluetooth ? (
            <div
              className="header-help"
              onClick={() => {
                if (helpId !== helpBluetooth) {
                  if (helpId === helpCamera)
                    localStorage.setItem('help-my-activity-visited', 'true');
                  setHelpId(helpId + 1);
                } else {
                  localStorage.setItem('help-bluetooth-visited', 'true');
                  if (
                    localStorage.getItem('help-my-activity-visited') !== 'true'
                  )
                    setHelpId(helpId + 1);
                  else setHelpId(3);
                }
              }}
            >
              <p className="header-help-text">{help.msg[helpId]}</p>
              <button className="btn-accept">
                {/*TODO: use formatted message*/}
                <h2>تأیید</h2>
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default MyActivitiesHelp;
