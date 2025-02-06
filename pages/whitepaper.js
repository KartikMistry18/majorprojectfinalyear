import WhitePaper from '../components/WhitePaper';

const WhitePaperPage = () => {
    const title = "The Sky Protocol: Sky's Multi-Collateral Dai (MCD) System";

    const content = [
        {
            id: 'overview',
            title: 'Introduction',
            text: 'Beginning in 2015, the Sky project (formerly known as MakerDAO) operated with developers around the globe working together on the first iterations of code, architecture, and documentation...'
        },
        {
            id: 'sky-protocol',
            title: 'The Sky Protocol',
            text: 'Details about the Sky Protocol and how it evolved over the years...'
        },
        {
            id: 'dai-stablecoin',
            title: 'The Dai Stablecoin',
            text: 'Explanation of the Dai Stablecoin and its role in the ecosystem...'
        },
        {
            id: 'usds-stablecoin',
            title: 'The USDS Stablecoin',
            text: 'Discussion on the USDS stablecoin and its features...'
        },
        // Add more sections here as needed
    ];

    const sidebarItems = [
        { id: 'overview', title: 'An Overview of the Sky Protocol and Its Features' },
        { id: 'sky-protocol', title: 'The Sky Protocol' },
        { id: 'dai-stablecoin', title: 'The Dai Stablecoin' },
        { id: 'usds-stablecoin', title: 'The USDS Stablecoin' },
        { id: 'how-different', title: 'How is it different?' },
        { id: 'how-to-get-usds', title: 'How to get USDS?' },
        { id: 'sky-vaults', title: 'Sky Vaults' },
        { id: 'rwa-vaults', title: 'RWA Vaults' },
        { id: 'real-world-assets', title: 'About Real World Assets' },
        { id: 'vaults-work', title: 'How the vaults work' },
        { id: 'technical-overview', title: 'High-Level Technical Overview' },
        { id: 'liquidation-process', title: 'RWA Liquidation Process' },
        { id: 'future-vaults', title: 'The future of RWA Vaults' },
        { id: 'external-actors', title: 'Key External Actors' }
    ];

    return (
        <WhitePaper title={title} content={content} sidebarItems={sidebarItems} />
    );
};

export default WhitePaperPage;
