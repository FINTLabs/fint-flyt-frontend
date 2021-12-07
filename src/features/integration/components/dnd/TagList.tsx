import {Box} from "@mui/material";
import {Tag} from "./Tag";
import {tagList} from "../../util/DefaultValues";

const TagList: React.FunctionComponent<any> = (props) => {
    return (
        <Box className={props.style}>
                {tagList.map((tag, index) => {
                    return (
                        <Tag key={index} value={tag.value} name={tag.name}/>
                    )}
                )}
        </Box>
    );
}


export default TagList;