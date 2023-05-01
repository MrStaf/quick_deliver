import { randomUUID } from "crypto";
import { v4 as uuidv4 } from 'uuid';
type MJMLData = {
    type: string,
    props: {
        children: MJMLParser[],
        parent: MJMLParser | null,
        [key: string]: any
    },
    content: string,
    attributes: {
        [key: string]: any
    }
}

class MJMLParser {
    ref: string;
    type: string;
    content: string;
    attributes: { [key: string]: any };
    props: { children: MJMLParser[]; parent: MJMLParser | null;[key: string]: any };

    constructor({ type = "mjml", content = "", attributes = {}, props = { children: [], parent: null } }: MJMLData) {
        this.ref = uuidv4();
        this.type = type;
        this.content = content;
        this.attributes = attributes;
        this.props = props;
    }
    get_children() {
        return this.props.children;
    }
    get_parent() {
        return this.props.parent;
    }
    get_type() {
        return this.type;
    }
    get_content() {
        return this.content;
    }
    get_attributes() {
        return this.attributes;
    }
    get_props() {
        return this.props;
    }
    set_children(children: MJMLData[]) {
        this.props.children = children;
    }
    set_parent(parent: MJMLData) {
        this.props.parent = parent;
    }
    set_type(type: string) {
        this.type = type;
    }
    set_content(content: string) {
        this.content = content;
    }
    set_attributes(attributes: { [key: string]: any }) {
        this.attributes = attributes;
    }
    set_props(props: { [key: string]: any }) {
        if (props.children) {
            this.props.children = props.children;
            delete props.children;
        }
        if (props.parent) {
            this.props.parent = props.parent;
            delete props.parent;
        }
        this.props = { ...this.props, ...props };
    }
    add_child(child: MJMLData) {
        child.props.parent = this;
        this.props.children.push(child);
    }
    remove_child(child: MJMLData) {
        this.props.children = this.props.children.filter((c) => c.ref !== child.ref);
    }
    remove_parent() {
        this.props.parent = null;
    }
    remove_attribute(attribute: string) {
        delete this.attributes[attribute];
    }
    remove_prop(prop: string) {
        delete this.props[prop];
    }
    remove() {
        if (this.props.parent) {
            this.props.parent.props.children = this.props.parent.props.children.filter((c) => c.ref !== this.ref);
        }
    }
    add_attribute(attribute: string, value: any) {
        this.attributes[attribute] = value;
    }
    add_prop(prop: string, value: any) {
        this.props[prop] = value;
    }
    parse(): string {
        let res = ""
        if (this.get_parent() == null) {
            res = "<mjml>\n\t<mj-body>\n<mj-section>\n"
        }
        res += `<mj-${this.type} ${Object.entries(this.attributes).map(([k, v]) => `${k}="${v}"`).join(" ")}>${this.content}${this.props.children.map((c: MJMLParser) => c.parse()).join("")}</mj-${this.type}>`;
        if (this.get_parent() == null) {
            res += "</mj-section>\n\t</mj-body>\n</mjml>"
        }
        return res;
    }

}

export { MJMLParser, MJMLData }