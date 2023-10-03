const formContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const formItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const sidebarContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
}

const sidebarItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export { formContainer, formItem, sidebarContainer, sidebarItem }
