import { TreePropsType } from "../../types"
import TreeNode from "../TreeNode/TreeNode"
import "./Tree.css"

const Tree = ({tree, rootName}: TreePropsType) => {
    const root = tree[rootName]
    if (!root) {
        return <div className="tree">Корень дерева не определен</div>
    }
    return (
        <div className="tree">
            <TreeNode
                tree={tree}
                id={root.id}
                name={root.name}
                children={root.children}/>
        </div>
    )
}

export default Tree