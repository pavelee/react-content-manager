import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { PageGeneratorContextProvider, usePageGeneratorContext } from "./propsContext";

describe("PageGeneratorContextProvider", () => {
    it("should render children", () => {
        const { getByText } = render(
            <PageGeneratorContextProvider>
                <div>Test</div>
            </PageGeneratorContextProvider>
        );

        expect(getByText("Test")).toBeInTheDocument();
    });

    it.skip("should provide an empty props object by default", () => {
        const TestComponent = () => {
            const { props } = usePageGeneratorContext();
            return <div>{JSON.stringify(props)}</div>;
        };

        const { getByText } = render(
            <PageGeneratorContextProvider>
                <TestComponent />
            </PageGeneratorContextProvider>
        );

        expect(getByText("{}")).toBeInTheDocument();
    });
});