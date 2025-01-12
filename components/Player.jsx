import { useState } from "react";

export default function Player({name, symbol, isActive}) {
      let [playerName, setPlayerName] = useState(name);
      let [isEditing, setIsEditing] = useState(false);
      function editing(){
            setIsEditing((editing)=> !editing);
      }
      function handleChange({target}) {
            setPlayerName(target.value)
      }
      let editPlayerName = <span className="player-name">{playerName}</span>
      if (isEditing) editPlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
      return (
          <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editPlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editing}>{isEditing ? "Save" : "Edit"}</button>
          </li>
      )
}