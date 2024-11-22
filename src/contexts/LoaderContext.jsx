import sources from "src/assets/sources.js";
import { createContext, useState, useEffect, useCallback } from "react";
import { LoadingManager, RepeatWrapping } from "three";
import { flushSync } from "react-dom";

const getFileName = (path) => {
  return path.split("/").pop().split(".").slice(0, -1).join(".");
};

const LoaderContext = createContext(0);

const LoaderProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [assets, setAssets] = useState();

  useEffect(() => {
    if (sources.length == 0) {
      setProgress(1);
      setCompleted(true);
    }

    let assets = {};

    let manager = new LoadingManager();

    manager.onProgress = (_, loaded, total) => {
      flushSync(() => {
        setProgress(loaded / total);
      });
    };

    manager.onLoad = () => {
      flushSync(() => {
        setAssets(assets);
        setCompleted(true);
      });
    };

    sources.forEach((item) => {
      assets[item.type] = {};
      let loader = new item.loader(manager);

      if (item.type == "cubemap") {
        for (let [name, paths] of Object.entries(item.paths)) {
          loader.load(paths, (loaded) => {
            assets[item.type][name] = loaded;
          });
        }
        return;
      }

      item.paths.forEach((path) => {
        let name = getFileName(path);
        loader.load(path, (loaded) => {
          if (item.type == "texture") {
            loaded.flipY = false;
            loaded.wrapS = RepeatWrapping;
            loaded.wrapT = RepeatWrapping;
          }

          if (item.type == "gltf") {
            let nodes = {};

            loaded.scene.traverse((node) => {
              if (node.isObject3D) {
                nodes[node.name] = node;
              }
            });

            loaded.nodes = nodes;
          }

          assets[item.type][name] = loaded;
        });
      });
    });
  }, []);

  const getNode = useCallback(
    (modelName, nodeName) => {
      if (assets) {
        return assets.gltf[modelName].nodes[nodeName];
      }
    },
    [assets]
  );

  const getTexture = useCallback(
    (textureName) => {
      if (assets) {
        return assets.texture[textureName];
      }
    },
    [assets]
  );

  const getCubeMap = useCallback(
    (cubeMapName) => {
      if (assets) {
        return assets.cubemap[cubeMapName];
      }
    },
    [assets]
  );

  return (
    <LoaderContext.Provider
      value={{ progress, completed, assets, getNode, getTexture, getCubeMap }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export { LoaderContext, LoaderProvider };
