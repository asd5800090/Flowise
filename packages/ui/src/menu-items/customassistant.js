// assets
import { IconTrash, IconMessage, IconAdjustmentsHorizontal, IconUsers } from '@tabler/icons-react'

// constant
const icons = {
    IconTrash,
    IconMessage,
    IconAdjustmentsHorizontal,
    IconUsers
}

// ==============================|| SETTINGS MENU ITEMS ||============================== //

const customAssistantSettings = {
    id: 'settings',
    title: '',
    type: 'group',
    children: [
        {
            id: 'viewMessages',
            title: 'settingsMenu.viewMessages',
            type: 'item',
            url: '',
            icon: icons.IconMessage
        },
        {
            id: 'viewLeads',
            title: 'settingsMenu.viewLeads',
            type: 'item',
            url: '',
            icon: icons.IconUsers
        },
        {
            id: 'chatflowConfiguration',
            title: 'settingsMenu.chatflowConfiguration',
            type: 'item',
            url: '',
            icon: icons.IconAdjustmentsHorizontal
        },
        {
            id: 'deleteAssistant',
            title: 'settingsMenu.deleteAssistant',
            type: 'item',
            url: '',
            icon: icons.IconTrash
        }
    ]
}

export default customAssistantSettings
