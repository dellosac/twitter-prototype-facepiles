import PositionPageLoader from "./PositionPageLoader";
import ScalePageLoader from "./ScalePageLoader";
import NoPageLoader from "./NoPageLoader";
import GhostPageLoader from "./GhostPageLoader";

const PageLoaderConfigs = {
  Position: PositionPageLoader,
  Scale: ScalePageLoader,
  Ghost: GhostPageLoader,
  None: NoPageLoader,
};

export default PageLoaderConfigs;
