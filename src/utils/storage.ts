
export const saveToStorage = (item : string, value : unknown) : void => {
    window.localStorage.setItem(`${item}`, JSON.stringify(value))
}

export const getFromStorage = <T>(item: string): T | false => {
    const resItem = window.localStorage.getItem(item) || null;
    if (resItem === null) {
      return false;
    }
    const parsedItem = JSON.parse(resItem) as T;
    return parsedItem;
  }

export const resetStorage = (item : string) => {
    window.localStorage.removeItem(`${item}`)
}