// import { Container } from './Container';
// import { DevicePhoneMobileIcon, FolderIcon, Cog6ToothIcon,
//     ChartBarIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon,
//     InformationCircleIcon
//  } from '@heroicons/react/20/solid';

// interface CardData {
//     id: number;
//     title: string;
//     description: string;
//     icon: string;
// }

// interface CardGridProps {
//     data: {
//         id: number;
//         cards: CardData[];
//     }
// }

// function iconSelect(iconKey: string) {
//     switch (iconKey) {
//       case "DevicePhoneMobile":
//         return <DevicePhoneMobileIcon className="w-7 h-7 text-[#FB4D46]" />;
//       case "Folder":
//         return <FolderIcon className="w-7 h-7 text-[#FB4D46]" />;
//       case "Cog6Tooth":
//         return <Cog6ToothIcon className="w-7 h-7 text-[#FB4D46]" />;
//       case "ChartBar":
//         return <ChartBarIcon className="w-7 h-7 text-[#FB4D46]" />;
//       case "ShieldCheck":
//         return <ShieldCheckIcon className="w-7 h-7 text-[#FB4D46]" />;
//       case "ChatBubbleLeftRight":
//         return <ChatBubbleLeftRightIcon className="w-7 h-7 text-[#FB4D46]" />;
//       default:
//         return <InformationCircleIcon className="w-7 h-7 text-[#FB4D46]" />;
//     }
// }

// const Card = ({ card }: { card: CardData }) => {
//     return (
//         <div
//             className="relative flex flex-col items-center text-center p-6 rounded-lg 
//                 transition-all duration-300 h-full bg-transparent dark:bg-transparent
//                 hover:bg-white dark:hover:bg-trueGray-800 hover:shadow-xl hover:scale-[1.02]
//                 border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
//         >
//             <div className="mb-4">
//                 {iconSelect(card.icon)}
//             </div>
//             <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
//                 {card.title}
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//                 {card.description}
//             </p>
//         </div>
//     );
// };

// const CardGrid = ({ data }: Readonly<CardGridProps>) => {
//     if (!data) return null;
//     const cards = data.cards;
//     return (
//         <Container>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:px-[70px]">
//                 {cards.map((card) => (
//                     <Card key={card.id} card={card} />
//                 ))}
//             </div>
//         </Container>
//     );
// };

// export default CardGrid;

import { Container } from './Container';
import { DevicePhoneMobileIcon, FolderIcon, Cog6ToothIcon,
    ChartBarIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon,
    InformationCircleIcon
 } from '@heroicons/react/20/solid';

interface CardData {
    id: number;
    title: string;
    description: string;
    icon: string;
}

interface CardGridProps {
    data: {
        id: number;
        cards: CardData[];
    }
}

function iconSelect(iconKey: string) {
    switch (iconKey) {
      case "DevicePhoneMobile":
        return <DevicePhoneMobileIcon className="w-7 h-7 text-[#FB4D46]" />;
      case "Folder":
        return <FolderIcon className="w-7 h-7 text-[#FB4D46]" />;
      case "Cog6Tooth":
        return <Cog6ToothIcon className="w-7 h-7 text-[#FB4D46]" />;
      case "ChartBar":
        return <ChartBarIcon className="w-7 h-7 text-[#FB4D46]" />;
      case "ShieldCheck":
        return <ShieldCheckIcon className="w-7 h-7 text-[#FB4D46]" />;
      case "ChatBubbleLeftRight":
        return <ChatBubbleLeftRightIcon className="w-7 h-7 text-[#FB4D46]" />;
      default:
        return <InformationCircleIcon className="w-7 h-7 text-[#FB4D46]" />;
    }
}

const Card = ({ card }: { card: CardData }) => {
    return (
        <div
            className="relative flex flex-col items-center text-center p-6 rounded-lg 
                transition-all duration-300 h-full
                md:bg-transparent md:dark:bg-transparent
                bg-white dark:bg-trueGray-900
                hover:bg-white dark:hover:bg-trueGray-800 hover:shadow-xl hover:scale-[1.02]
                border border-gray-300 lg:border-transparent
                hover:border-gray-100 dark:hover:border-gray-700"
        >
            <div className="mb-4">
                {iconSelect(card.icon)}
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
                {card.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
                {card.description}
            </p>
        </div>
    );
};

const CardGrid = ({ data }: Readonly<CardGridProps>) => {
    if (!data) return null;
    const cards = data.cards;
    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:px-[70px]">
                {cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
        </Container>
    );
};

export default CardGrid;