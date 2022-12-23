const fs = require("fs");

let code = `
import lerkey from "./lerkey";


export default (): lerkey => {
    return {
        startRoom: 'start',
        rooms: [
            $rooms
        ],
        things: [
            $things
        ],
        characters: [
            $characters
        ],
    };
}


`;

const getFileName = (str) => str.split("\\").pop().split("/").pop();
const getBaseName = (str) => str.replace(".tsx", "");

const isDirectory = async (path) => {
  try {
    const stats = await fs.promises.lstat(path);
    return stats.isDirectory();
  } catch (error) {
    throw new Error("No such file or Directory");
  }
};

const createTree = async (files, imports, label, path) => {
  const data = await fs.promises.readdir(path);
  for (const item of data) {
    const currentLocation = `${path}/${item}`;
    const isDir = await isDirectory(currentLocation);
    if (!isDir) {
      const filename = getFileName(currentLocation);
      const basename = getBaseName(filename);
      imports.push([basename, `../game/${label}/${basename}`]);
      files.push(basename);
      continue;
    }
    await createTree(currentLocation);
  }
};

const runPan = async () => {
  const rooms = [];
  const characters = [];
  const things = [];
  const imports = [];
  await createTree(rooms, imports, "rooms", "./src/game/rooms");
  await createTree(things, imports, "things", "./src/game/things");
  await createTree(characters, imports, "characters", "./src/game/characters");
  code = imports.map(i => {
    const [bas, imp] = i;
    return `import ${bas} from "${imp}";`
  }).join('\n') + code;
  code = code.replace('$rooms', rooms.join(',\n'));
  code = code.replace('$things', things.join(',\n'));
  code = code.replace('$characters', characters.join(',\n'));
  fs.writeFile("./src/lib/defineTurkey.tsx", code, (err) => {
    if (err) {
      throw err;
    }
  });
}

runPan();
