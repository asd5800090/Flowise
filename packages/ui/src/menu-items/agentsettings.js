// assets
import {
    IconTrash,
    IconFileUpload,
    IconFileExport,
    IconCopy,
    IconMessage,
    IconDatabaseExport,
    IconAdjustmentsHorizontal,
    IconUsers,
    IconTemplate
} from '@tabler/icons-react'

// constant
const icons = {
    IconTrash,
    IconFileUpload,
    IconFileExport,
    IconCopy,
    IconMessage,
    IconDatabaseExport,
    IconAdjustmentsHorizontal,
    IconUsers,
    IconTemplate
}

// ==============================|| SETTINGS MENU ITEMS ||============================== //

const agent_settings = {
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
            id: 'saveAsTemplate',
            title: 'settingsMenu.saveAsTemplate',
            type: 'item',
            url: '',
            icon: icons.IconTemplate
        },
        {
            id: 'duplicateChatflow',
            title: 'settingsMenu.duplicateAgents',
            type: 'item',
            url: '',
            icon: icons.IconCopy
        },
        {
            id: 'loadChatflow',
            title: 'settingsMenu.loadAgents',
            type: 'item',
            url: '',
            icon: icons.IconFileUpload
        },
        {
            id: 'exportChatflow',
            title: 'settingsMenu.exportAgents',
            type: 'item',
            url: '',
            icon: icons.IconFileExport
        },
        {
            id: 'deleteChatflow',
            title: 'settingsMenu.deleteAgents',
            type: 'item',
            url: '',
            icon: icons.IconTrash
        }
    ]
}

export default agent_settings
