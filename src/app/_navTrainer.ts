import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: 'dashboard',

  },
  {
    title: true,
    name: 'TRAINING SESSIONS'
  },
  {
    name: 'Session List',
    url: 'training-session-list',
    icon: 'icon-list'
  },
  {
    title: true,
    name: 'VIRTUAL MACHINES'
  },
  {
    name: 'Virtual Machine List',
    url: 'virtual-machine-list',
    icon: 'icon-list'
  },
  {
    title: true,
    name: 'LEAVE DETAILS'
  },
  {
    name: 'Apply Leave',
    url: 'leave-apply',
    icon: 'icon-pencil'
  },
  {
    name: 'Leave List',
    url: 'leave-list',
    icon: 'icon-list'
  }
  
  
];
