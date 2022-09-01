export interface UIState {
  isModalOpen: boolean;
}

const state = (): UIState => ({
  isModalOpen: false,
});

const getters = {
  getIsModalOpen: (state: UIState) => state.isModalOpen,
};

const actions = {
  openModal() {
    this.isModalOpen = true;
  },

  closeModal() {
    this.isModalOpen = false;
  },
};

export const useUIStore = definePiniaStore("UI", {
  state,
  getters,
  actions,
});
