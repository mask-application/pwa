import React, { useState } from 'react';
import '../../MyActivitiesStyle.scss';
import help from './help';

function MyActivitiesHelp() {
  const [helpId, setHelpId] = useState(0);

  return (
    <>
      {localStorage.getItem('help-visited') !== 'true' ? (
        <>
          <div
            className={
              helpId == 0
                ? 'overlay-help overlay-qr-code'
                : helpId === 1
                ? 'overlay-help overlay-camera'
                : ''
            }
          />
          {helpId !== 2 ? (
            <div className="header-help">
              <p>{help.msg[helpId]}</p>
              <button
                className="btn-accept"
                onClick={() => {
                  if (helpId === 1)
                    localStorage.setItem('help-visited', 'true');
                  setHelpId(helpId + 1);
                }}
              >
                تأیید
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default MyActivitiesHelp;
