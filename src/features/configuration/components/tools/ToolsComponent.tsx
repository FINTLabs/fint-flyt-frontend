import * as React from "react";
import {ReactElement, useState} from "react";
import {Box, Button, Dropdown, Heading, HStack, ReadMore, VStack} from "@navikt/ds-react";
import {ITag} from "../../types/Metadata/Tag";
import {Tag} from "../common/dnd/Tag";
import {ValueType} from "../../types/Metadata/IntegrationMetadata";
import {PlusIcon} from "@navikt/aksel-icons";
import {useTranslation} from "react-i18next";

interface Props {
    icon?: ReactElement
    content: ITag[]
}

const ToolsComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.toolsPanel'});
    const [tags, setTags] = useState<ITag[]>([])
    return <VStack>
        <HStack align={"center"} gap={"2"}>
            {props.icon && props.icon}
            <Heading size={"small"}>{t('header')}</Heading>
        </HStack>
        <ReadMore defaultOpen header={t('description')}>
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
                        <Button type={"button"} as={Dropdown.Toggle}
                                style={{backgroundColor: 'gray', borderRadius: "30px", padding: '8px 8px 0px 8px'}}>
                            <PlusIcon aria-hidden style={{padding: 'none'}}/>
                        </Button>{" "}
                        <Dropdown.Menu>
                            <Dropdown.Menu.GroupedList>
                                <Dropdown.Menu.GroupedList.Item type={"button"} onClick={() => {
                                    setTags([...tags, {name: "", type: ValueType.STRING, value: "test", tagKey: "key"}])
                                }}>
                                    {t('string')}
                                </Dropdown.Menu.GroupedList.Item>
                                <Dropdown.Menu.GroupedList.Item type={"button"} onClick={() => {
                                    setTags([...tags, {
                                        name: "",
                                        type: ValueType.INTEGER,
                                        value: "test",
                                        tagKey: "key"
                                    }])
                                }}>
                                    {t('integer')}
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
