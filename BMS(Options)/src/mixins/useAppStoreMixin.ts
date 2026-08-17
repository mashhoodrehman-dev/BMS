import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default defineComponent({
  computed: {
    ...mapState({
      posts: (state: any) => state.posts,
      isLoading: (state: any) => state.isLoading,
      isError: (state: any) => state.error,
    }),
    searchQuery: {
      get(): string {
        return this.$store.state.searchQuery;
      },
      set(value: string) {
        this.setSearchQuery(value);
      },
    },
  },
  methods: {
    ...mapActions(["loadPosts", "createPost"]),
    ...mapMutations(["setSearchQuery"]),
  },
  retryPoss() {
    this.loadPosts();
  },
});
