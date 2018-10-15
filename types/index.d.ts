import PlaceHolder from "../src/placeholder";
import Element from '../src/element'

interface HTMLFixedElement extends HTMLElement {
  placeholderNode: PlaceHolder | null
  fixedHandler: Function | null,
  _fixedElement: Element
}

