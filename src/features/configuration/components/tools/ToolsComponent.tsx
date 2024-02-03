import * as React from "react";
import {ReactElement, useState} from "react";
import {Box, Dropdown, Heading, HStack, Link, ReadMore, VStack} from "@navikt/ds-react";
import {ITag} from "../../types/Metadata/Tag";
import {Tag} from "../common/dnd/Tag";
import {ValueType} from "../../types/Metadata/IntegrationMetadata";
import {PlusIcon} from "@navikt/aksel-icons";

interface Props {
    icon?: ReactElement
    displayName?: string;
    content: ITag[]
}

const ToolsComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [tags, setTags] = useState<ITag[]>([])
    return <VStack>
        <HStack align={"center"} gap={"2"}>
            {props.icon && props.icon}
            {props.displayName &&
                <Heading size={"xsmall"}>{props.displayName}</Heading>}
        </HStack>
        <ReadMore defaultOpen header={"Tekst og tall"}>
            <Box background={"surface-default"} padding={"2"} borderRadius={"large"}
                 borderWidth="2" borderColor={"border-subtle"}>
                <HStack justify={"space-between"}>
                    <HStack gap={"2"} id={"tag-container"}>
                    {tags.map((tag, index) => {
                        return <Tag key={index}
                                    type={tag.type}
                                    name={tag.name}
                                    description={""}
                                    tagKey={""}
                                    value={""}
                        />
                    })}
                    </HStack>
                    <Dropdown>
                        <Link type={"button"} as={Dropdown.Toggle} inlineText style={{borderRadius: "5px"}}>
                            <PlusIcon aria-hidden />
                        </Link>{" "}
                        <Dropdown.Menu>
                            <Dropdown.Menu.GroupedList>
                                <Dropdown.Menu.GroupedList.Item type={"button"} onClick={() => {setTags([...tags, {name: "", type: ValueType.STRING, value: "test", tagKey: "key"}])}}>
                                    Tekst
                                </Dropdown.Menu.GroupedList.Item>
                                <Dropdown.Menu.GroupedList.Item type={"button"} onClick={() => {setTags([...tags, {name: "", type: ValueType.INTEGER, value: "test", tagKey: "key"}])}}>
                                    Heltall
                                </Dropdown.Menu.GroupedList.Item>
                            </Dropdown.Menu.GroupedList>
                        </Dropdown.Menu>
                    </Dropdown>
                </HStack>
            </Box>
        </ReadMore>
    </VStack>
}
export default ToolsComponent;
