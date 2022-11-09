export const getMaxZIndex = () => {
	const allElement = Array.from(document.getElementsByTagName("*"));
	const zIndexArray: number[] = []
	allElement.forEach((item) => {
		zIndexArray.push(Number(window.getComputedStyle(item, null).getPropertyValue("z-index")) || 0)
	})
	const maxZIndex = Math.max(...zIndexArray)
	return {
    maxZIndex: maxZIndex,
    maxZIndexNum: zIndexArray.filter(ele => ele === maxZIndex).length,
  }
}

export const quickFor = (n: number, fun: any) => {
	let i
	for ( i=0; i < n; i++) {
		fun(i)
	}
}