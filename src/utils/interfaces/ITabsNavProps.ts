interface ITabsNavProps {
    handleClick: (item: string) => void,
    tabs: {
        item: string,
        label: string,
    }[],
    customClasses?: string
}