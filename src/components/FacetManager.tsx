import {
  FacetManager as HeadlessFacetManager,
  Facet as HeadlessFacet,
  FacetManagerPayload,
} from "@coveo/headless";
import {
  useEffect,
  useState,
  FunctionComponent,
  ReactElement,
  Children,
} from "react";

type FacetManagerChild = ReactElement<{ controller: HeadlessFacet }>;

interface FacetManagerProps {
  controller: HeadlessFacetManager;
  children: FacetManagerChild | FacetManagerChild[];
}

export const FacetManager: FunctionComponent<FacetManagerProps> = (props) => {
  const { controller } = props;
  const [, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), []);

  function createPayload(
    facets: FacetManagerChild[]
  ): FacetManagerPayload<FacetManagerChild>[] {
    return facets.map((facet) => ({
      facetId: facet.props.controller.state.facetId,
      payload: facet,
    }));
  }

  const childFacets = Children.toArray(props.children) as FacetManagerChild[];
  const payload = createPayload(childFacets);
  const sortedFacets = controller.sort(payload).map((p) => p.payload);

  return <div>{sortedFacets}</div>;
};
