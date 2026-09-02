import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUIStore } from '~/stores/useUIStore';

describe('useUIStore Pinia Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with default state', () => {
    const store = useUIStore();
    expect(store.isModalOpen).toBe(false);
    expect(store.showSideBar).toBe(false);
    expect(store.getIsModalOpen).toBe(false);
    expect(store.getShowSideBar).toBe(false);
  });

  it('should open and close modal correctly', () => {
    const store = useUIStore();

    store.openModal();
    expect(store.isModalOpen).toBe(true);
    expect(store.getIsModalOpen).toBe(true);

    store.closeModal();
    expect(store.isModalOpen).toBe(false);
    expect(store.getIsModalOpen).toBe(false);
  });

  it('should toggle side navigation correctly', () => {
    const store = useUIStore();

    store.toggleSideNav();
    expect(store.showSideBar).toBe(true);
    expect(store.getShowSideBar).toBe(true);

    store.toggleSideNav();
    expect(store.showSideBar).toBe(false);
    expect(store.getShowSideBar).toBe(false);
  });
});
