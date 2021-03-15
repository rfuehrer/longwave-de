import React from "react";
import { useParams } from "react-router-dom";
import { CenteredRow } from "./LayoutElements";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { InitialGameState } from "../../state/GameState";

import { useTranslation } from "react-i18next";

export function RoomIdHeader() {
  const { t } = useTranslation();
  const { roomId }: { [k: string]: any } = useParams();

  return (
    <CenteredRow
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        color: "gray",
      }}
    >
      <div style={{ margin: 4, padding: 4 }}>
        {t("roomidheader.roomid")} {roomId}
      </div>
      <Tippy content={<RoomMenu />} interactive placement="bottom-end">
        <div tabIndex={0} style={{ padding: 8 }}>
          <FontAwesomeIcon icon={faCogs} />
        </div>
      </Tippy>
    </CenteredRow>
  );
}

function RoomMenu() {
  const { t, i18n } = useTranslation();
  const { roomId }: { [k: string]: any } = useParams();

  const changeLanguage = (language: string | undefined) => {
    i18n.changeLanguage(language);
  };

  const { setGameState } = useContext(GameModelContext);

  // Information about HTML flag symbols: https://emojiguide.org/flags
  return (
    <div>
      <div
        tabIndex={0}
        style={{ cursor: "pointer" }}
        onClick={() => setGameState(InitialGameState())}
      >
        <FontAwesomeIcon icon={faUndo} />{" "}{t("roomidheader.reset_room")}
      </div>

      <div
        tabIndex={0}
        style={{ cursor: "pointer" }}
        onClick={() => {navigator.clipboard.writeText(window.location.href)}}
      >
        <FontAwesomeIcon icon={faCopy} />{" "}{t("roomidheader.copy_room_link")}
      </div>

      <div
        tabIndex={1}
      >
        {t("roomidheader.switch_language_header")}:
      </div>
      <div
        tabIndex={2}
        style={{ cursor: "pointer" }}
        onClick={() => changeLanguage("en")}
      >
        &#127468;&#127463;{" "}{t("roomidheader.language_en")}
      </div>
      <div
        tabIndex={2}
        style={{ cursor: "pointer" }}
        onClick={() => changeLanguage("de")}
      >
        &#127465;&#127466;{" "}{t("roomidheader.language_de")}
      </div>
    </div>
  );
}
