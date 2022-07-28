import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getGroupById, deleteGroupThunk, getGroups } from '../../store/groups';
import EditGroupModal from '../EditGroupModal';

export default function GroupDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();
    const group = useSelector(state => state.groups)[groupId];
    // console.log('groups',groups);
    // const group = groups[groupId];
    console.log('group',group);
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
        console.log(groupId)
        const awaitDelete = await dispatch(deleteGroupThunk(groupId));
        history.push('/groups');
    }

    if (!group) return null;
    // if (!group.Organizer) return null;

    return (
        <div className='group-detail-page'>
            <div className='group-detail-upper'>
                <img src={group.previewImage} alt='group-image' className='group-image'></img>
                <div>
                    <h1>{group.name}</h1>
                    <p>{group.numMembers} member(s)</p>
                    <p>Owner: {group.Organizer && group.Organizer.firstName}</p>
                    <p>{group.city}, {group.state}</p>
                    <button>Join This Group</button>
                    {isOrganizer && <EditGroupModal group={group} />}
                    {isOrganizer && <button onClick={() => handleDelete(groupId)}>Delete This Group</button>}
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
                    <h3>Members</h3>
                    {group.Members && group.Members.map((member, i) => <p key={i}>{member.firstName} {member.lastName}</p>)}
                </div>
            </div>
        </div>
    );
};