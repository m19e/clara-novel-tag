import React, { useState, createRef } from "react";
import Tags, { Tag } from "react-tag-autocomplete";
import TagsInput from "react-tagsinput";

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

const LocalTagsInput = () => {
    const [tags, setTags] = useState([]);

    const handleChange = (tags: never[]) => {
        setTags(tags);
    };

    return (
        <div className="flex justify-center items-center w-1/2">
            <TagsInput value={tags} onChange={handleChange} />
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
