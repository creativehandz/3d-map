import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextureLoader, CubeTextureLoader } from "three";

const sources = [
  {
    type: "gltf",
    loader: GLTFLoader,
    paths: ["./model.glb", "./zones.glb"],
  },

  {
    type: "texture",
    loader: TextureLoader,
    paths: ["./map.jpg", "./marker.jpg", "./noise.png"],
  },

  // {
  //   type: "cubemap",
  //   loader: CubeTextureLoader,
  //   paths: {
  //     cubemap1: [
  //       "./envmap/px.png",
  //       "./envmap/nx.png",
  //       "./envmap/py.png",
  //       "./envmap/ny.png",
  //       "./envmap/pz.png",
  //       "./envmap/nz.png",
  //     ],
  //   },
  // },
];

export default sources;
