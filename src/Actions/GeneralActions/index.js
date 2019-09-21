export function page_change(page) {
    return {
        type: "PAGE_CHANGE",
        page
    }
}

export function toggle_header() {
    return {
        type: "TOGGLE_HEADER",
    }
}

export function toggle_drawer() {
    return {
        type: "TOGGLE_DRAWER",
    }
}

export function togge_theme(theme) {
    return {
        type: "TOGGLE_THEME",
        theme
    }
}