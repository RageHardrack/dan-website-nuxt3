export interface UIState {
  isModalOpen: boolean;
  showSideBar: boolean;
}

export default definePiniaStore("UI", {
  state: (): UIState => ({
    isModalOpen: false,
    showSideBar: false,
  }),
  getters: {
    getIsModalOpen: (state: UIState) => computed(() => state.isModalOpen),
    getShowSideBar: (state: UIState) => computed(() => state.showSideBar),
  },
  actions: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    toggleSideNav() {
      this.showSideBar = !this.showSideBar;
    },
  },
});
