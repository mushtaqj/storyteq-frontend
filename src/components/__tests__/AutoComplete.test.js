/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
import { expect } from "vitest";
import AutoComplete from "../AutoComplete.vue";

test("mount component & check defaults if no props provided", () => {
  expect(AutoComplete).toBeDefined();

  const compUT = mount(AutoComplete);
  const actualProps = compUT.props();
  const expectedProps = { minLength: 3, prompt: "", suggestions: [] };

  expect(actualProps).toEqual(expectedProps);
});

test("mount component & check props when they are provided", () => {
  expect(AutoComplete).toBeDefined();

  const props = { minLength: 2, prompt: "Search Books" };

  const compUT = mount(AutoComplete, {
    props,
  });
  const actualProps = compUT.props();
  const expectedProps = { ...props, suggestions: [] };

  expect(actualProps).toEqual(expectedProps);
});

test("check component default state before interaction", async () => {
  expect(AutoComplete).toBeDefined();
  const props = { minLength: 2, prompt: "Books" };
  const compUT = mount(AutoComplete, {
    props,
  });

  const promptDiv = compUT.get("div.prompt");
  const input = compUT.get("input");

  expect(compUT.html()).toMatchSnapshot();
  expect(promptDiv.text()).toBe(
    `Type atleast ${props.minLength} characters to begin searching`
  );
  expect(input.attributes("placeholder")).toBe("Search " + props.prompt);
});

// We can continue writing tests for each message and prompts and also check with the rendering with different templates
