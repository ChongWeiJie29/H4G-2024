
import React, { useEffect, useState } from 'react';
import sampleNotification from '../utilities/samples/SampleNotifications.json'
import NotificationRendererComponent from './NotificationRendererComponent';
import { EventInfo } from '../utilities/EventInfoInterface';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';

const AdminNotificationComponent: React.FC = () => {
    const username = useAppSelector(state => state.username.value);
    const [notifications, setNotifications] = useState<EventInfo[]>([]);
    const [isDone, setIsDone] = useState(false);
    const getEvents = async () => {
      const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/admin/getEvents`, {createdBy: username});
      setNotifications(response.data);
      setIsDone(true);
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
        !isDone
            ? <div></div>
            :
        <div className="vh-100 w-25">
            <h3>Notifications</h3>
            {notifications.length == 0 && <h5>No upcoming events!</h5>}
            <div className="bg-light h-50 overflow-auto rounded-3">
                {notifications.map(event => (
                    <NotificationRendererComponent event={event} />
                ))}
            </div>
        </div>
    );
};

export default AdminNotificationComponent;
