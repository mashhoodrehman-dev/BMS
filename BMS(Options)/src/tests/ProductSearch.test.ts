import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ProductSearch from "@/views/Home.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import store from "@/store";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", component: { template: "<div />" } },
    { path: "/posts/:id", component: { template: "<div />" } },
  ],
});

describe("search filtering", () => {
  beforeEach(() => {
    store.commit("setPosts", [
      {
        id: 1,
        title: "Hello World",
        body: "some body text",
        tags: ["intro"],
        reactions: { likes: 5, dislikes: 0 },
      },
      {
        id: 2,
        title: "Vue Tips",
        body: "some body text",
        tags: ["vue"],
        reactions: { likes: 10, dislikes: 1 },
      },
    ]);

    store.state.isLoading = false;
    store.commit("setSearchQuery", "");
  });
  (it("shows only the matching posts when searching", async () => {
    store.state.isLoading = false;
    const wrapper = mount(ProductSearch, {
      global: {
        plugins: [router, store],
      },
    });
    const input = wrapper.find("input");
    await input.setValue("Vue");

    expect(wrapper.text()).toContain("Vue Tips");
    expect(wrapper.text()).not.toContain("Hello World");
  }),
    it("Shows 'No products found' when nothing matches", async () => {
      store.state.isLoading = false;
      const wrapper = mount(ProductSearch, {
        global: {
          plugins: [router, store],
        },
      });
      const input = wrapper.find("input");
      await input.setValue("zzz");

      expect(wrapper.text()).toContain("No posts found");
    }),
    it("Shows All Products, when field is empty", async () => {
      store.state.isLoading = false;
      const wrapper = mount(ProductSearch, {
        global: {
          plugins: [router, store],
        },
      });
      const input = wrapper.find("input");
      await input.setValue("Vue");

      expect(wrapper.text()).not.toContain("Hello World");

      await input.setValue("");
      expect(wrapper.text()).toContain("Hello World");
      expect(wrapper.text()).toContain("Vue Tips");
    }),
    it("shows loading message, when isLoading is true", async () => {
      store.state.isLoading = true;

      const wrapper = mount(ProductSearch, {
        global: {
          plugins: [router, store],
        },
      });

      expect(wrapper.text()).toContain("Loading Posts...");
      expect(wrapper.text()).not.toContain("Hello World");
    }),
    it("updates the search qeury in store", () => {
      store.commit("setSearchQuery", "Vue");
      store.state.isLoading = false;
      expect(store.state.searchQuery).toBe("Vue");
    }));
});
