import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getGroupById, deleteGroupThunk, getGroups } from '../../store/groups';
import EditGroupModal from '../EditGroupModal';
import CreateEventModal from '../CreateEventModal';
import './GroupDetail.css';

export default function GroupDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();
    const group = useSelector(state => state.groups)[groupId];
    // console.log('groups',groups);
    // const group = groups[groupId];
    // console.log('group',group);
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
    // console.log('++++++++', group);

    const isOrganizer = sessionUser?.id === group?.organizerId;
    // async function getDetail(groupId) {
    //     const getGroup = await dispatch(getGroupById(groupId));
    //     const getMembers = await dispatch(getGroupMembers(groupId));
    // }

    useEffect(() => {
        dispatch(getGroupById(groupId));
    }, [dispatch]);

    const handleDelete = async groupId => {
        // console.log(groupId)
        const awaitDelete = await dispatch(deleteGroupThunk(groupId));
        history.push('/groups');
    }

    if (!group) return null;
    // if (!group.Organizer) return null;

    // const handleCreateEvent = () => {
    //     history.push(
    //         {pathname: '/events/create',
    //         group,}
    //     );
    // };

    return (
        <div className='group-detail-page'>
            <div className='group-detail-upper'>
                <div className='group-detail-img-container'>
                    <img src={group.previewImage} alt='group-image' className='group-image'></img>
                </div>
                <div className='group-detail-upper-right'>
                    <h1>{group.name}</h1>
                    <p><i className="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;Organized by {group.Organizer && group.Organizer.firstName}</p>
                    <p><i className="fa-solid fa-user-group"></i>&nbsp;&nbsp;{group.numMembers} member(s)</p>
                    <p><i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;&nbsp;{group.city}, {group.state}</p>
                    {isOrganizer && <EditGroupModal className='group-btn'group={group} />}
                    {isOrganizer && <CreateEventModal className='group-btn' group={group} />}
                    {isOrganizer && <button className='group-delete-btn' onClick={() => handleDelete(groupId)}>Delete This Group</button>}
                </div>
            </div>
            <div className='group-detail-lower'>
                <div className='group-about-section'>
                    <h3>What we're about</h3>
                    <p>{group.about}</p>
                </div>
                <div className='members'>
                    <h3>Organizer</h3>
                    <p>{group.Organizer && group.Organizer.firstName} {group.Organizer && group.Organizer.lastName}</p>
                    {/* <h3>Members</h3> */}
                    {/* {group.Members && group.Members.map((member, i) => <p key={i}>{member.firstName} {member.lastName}</p>)} */}
                </div>
            </div>
        </div>
    );
};
