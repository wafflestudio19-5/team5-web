export const boardDummy = require("./board-dummy-data.json");

const boardDetailDummy1 = require("./board-detail-1-dummy-data.json");
const boardDetailDummy2 = require("./board-detail-2-dummy-data.json");
const boardDetailDummy3 = require("./board-detail-3-dummy-data.json");
const boardDetailDummy4 = require("./board-detail-4-dummy-data.json");

export const getBoardDetailDummy = (id: string) => {
  switch (id) {
    case "1":
      return boardDetailDummy1;
    case "2":
      return boardDetailDummy2;
    case "3":
      return boardDetailDummy3;
    case "4":
      return boardDetailDummy4;
    default:
      return null;
  }
};
