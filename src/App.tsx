import React, { useState, createRef } from "react";
import AutosizeInput from "react-input-autosize";
import Tags, { Tag } from "react-tag-autocomplete";
import TagsInput, { RenderLayout } from "react-tagsinput";

const TagAutocomplete = () => {
    const [tags, setTags] = useState([
        { id: 1, name: "Apples" },
        { id: 2, name: "Pears" },
    ]);
    const [suggests, setSuggests] = useState([
        { id: 3, name: "Bananas" },
        { id: 4, name: "Mangos" },
        { id: 5, name: "Lemons" },
        { id: 6, name: "Apricots" },
    ]);
    const tagsRef = createRef<Tags>();

    const handleAddTag = (tag: Tag) => {
        setTags([...tags, tag as { id: number; name: string }]);
    };

    const handleDeleteTag = (i: number) => {
        const t = tags.slice(0);
        t.splice(i, 1);
        setTags(t);
    };

    return <Tags ref={tagsRef} tags={tags} suggestions={suggests} onDelete={handleDeleteTag} onAddition={handleAddTag} />;
};

const autoSizingRenderInput = ({ addTag, ...props }: TagsInput.RenderInputProps<never>) => {
    let { onChange, value, ...other } = props;
    return (
        <AutosizeInput
            type="text"
            {...other}
            placeholder="タグを追加"
            style={{ fontFamily: "sans-serif" }}
            inputClassName="bg-transparent border-0 text-sm font-normal outline-none focus:outline"
            onChange={onChange}
            value={value}
        />
    );
};

const LocalRenderLayout: RenderLayout = (tagComponents, inputComponent) => {
    return (
        <div>
            {tagComponents}
            {inputComponent}
        </div>
    );
};

const LocalTagsInput = () => {
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const inputRef = createRef<TagsInput<never>>();
    const reg = /[^_0-9a-zA-Z\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+/g;

    const handleChange = (tags: never[]) => {
        const valid = tags.map((t: string) => t.replace(reg, "") as never).filter((t: string) => t !== "");
        setTags(valid);
    };

    const handleChangeInput = (t: string) => {
        if (/[\s]/.test(t)) {
            inputRef.current?.accept();
            return;
        }
        if (Array.from(t).length >= 30) {
            setTag(Array.from(t).slice(0, 30).join(""));
            return;
        }
        setTag(t);
    };

    return (
        <div className="flex justify-center items-center w-1/2">
            <TagsInput
                ref={inputRef}
                value={tags}
                onChange={handleChange}
                inputValue={tag}
                onChangeInput={handleChangeInput}
                tagProps={{
                    className: "react-tagsinput-tag",
                }}
                renderInput={autoSizingRenderInput}
                renderLayout={LocalRenderLayout}
                onlyUnique={true}
                maxTags={10}
            />
        </div>
    );
};

const App = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex justify-center items-center mt-8">
                <TagAutocomplete />
            </div>
            <div className="flex justify-center items-center mt-8">
                <LocalTagsInput />
            </div>
        </div>
    );
};

export default App;
