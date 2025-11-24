/**
 * Binary Space Partitioning (BSP) Layout Generator
 * 
 * Generates a grid-based layout by recursively splitting a container.
 * Returns a pattern object compatible with the existing Editorial Gen app.
 * 
 * Now supports "Content Blocks" for dynamic typography.
 */

export const generateBSPPattern = (imageCount, hasContent = false) => {
    // Base grid size (12x12 allows for flexible division by 2, 3, 4, 6)
    const GRID_SIZE = 12;
    const MIN_SIZE = 2; // Minimum block size (2/12 = 16.6%)

    // Total blocks needed = images + (1 if content block is used)
    // However, sometimes we might want to overlay content on an image.
    // For now, let's try to reserve a dedicated block for content if requested.
    // If hasContent is true, we generate (imageCount + 1) blocks, and mark one as 'content'.
    const totalBlocks = hasContent ? imageCount + 1 : imageCount;

    // Initial block covering the whole grid
    let blocks = [
        { x: 0, y: 0, w: GRID_SIZE, h: GRID_SIZE, type: 'image' }
    ];

    // Split blocks until we reach the desired count
    while (blocks.length < totalBlocks) {
        // 1. Identify candidates that CAN be split
        const candidates = blocks.map((b, i) => ({ ...b, index: i }))
            .filter(b => b.w >= MIN_SIZE * 2 || b.h >= MIN_SIZE * 2);

        if (candidates.length === 0) break;

        // 2. Pick a block to split
        // Strategy: Mix of "Balance" (split largest) and "Contrast" (split others)
        let pickIndex = 0;
        const sortedByArea = [...candidates].sort((a, b) => (b.w * b.h) - (a.w * a.h));

        const strategy = Math.random();
        if (strategy > 0.6) {
            // 40% Chance: Contrast - Pick a random candidate
            const randomCandidate = candidates[Math.floor(Math.random() * candidates.length)];
            pickIndex = randomCandidate.index;
        } else {
            // 60% Chance: Balance - Pick the largest block
            pickIndex = sortedByArea[0].index;
        }

        const blockToSplit = blocks[pickIndex];
        blocks.splice(pickIndex, 1);

        // 3. Decide split direction
        let splitVertical = blockToSplit.w > blockToSplit.h;
        if (blockToSplit.w === blockToSplit.h) {
            splitVertical = Math.random() > 0.5;
        }

        // Force direction if one side is too small
        if (blockToSplit.w < MIN_SIZE * 2) splitVertical = false;
        if (blockToSplit.h < MIN_SIZE * 2) splitVertical = true;

        // 4. Determine split point
        let splitSize = 0;
        const totalSize = splitVertical ? blockToSplit.w : blockToSplit.h;
        const available = totalSize - (MIN_SIZE * 2);

        const splitStrategy = Math.random();
        if (splitStrategy > 0.7) {
            const half = Math.floor(totalSize / 2);
            if (half >= MIN_SIZE && (totalSize - half) >= MIN_SIZE) {
                splitSize = half;
            } else {
                splitSize = MIN_SIZE + Math.floor(Math.random() * (available + 1));
            }
        } else if (splitStrategy > 0.4) {
            const third = Math.floor(totalSize / 3);
            if (third >= MIN_SIZE && (totalSize - third) >= MIN_SIZE) {
                splitSize = third;
            } else {
                splitSize = MIN_SIZE + Math.floor(Math.random() * (available + 1));
            }
        } else {
            splitSize = MIN_SIZE + Math.floor(Math.random() * (available + 1));
        }

        // 5. Create new blocks
        // Inherit type from parent (default 'image')
        if (splitVertical) {
            const block1 = { x: blockToSplit.x, y: blockToSplit.y, w: splitSize, h: blockToSplit.h, type: 'image' };
            const block2 = { x: blockToSplit.x + splitSize, y: blockToSplit.y, w: blockToSplit.w - splitSize, h: blockToSplit.h, type: 'image' };
            blocks.push(block1, block2);
        } else {
            const block1 = { x: blockToSplit.x, y: blockToSplit.y, w: blockToSplit.w, h: splitSize, type: 'image' };
            const block2 = { x: blockToSplit.x, y: blockToSplit.y + splitSize, w: blockToSplit.w, h: blockToSplit.h - splitSize, type: 'image' };
            blocks.push(block1, block2);
        }
    }

    // Sort blocks by position
    blocks.sort((a, b) => {
        if (Math.abs(a.y - b.y) < 0.1) return a.x - b.x;
        return a.y - b.y;
    });

    // Assign Content Block
    // If hasContent is true, we need to pick one block to be the 'content' block.
    // Strategy: Pick a block that is "good" for text (not too thin).
    // Or just pick the first block (top-left) or a random one.
    if (hasContent) {
        // Filter blocks that are suitable for text (e.g., minimum width/height)
        const suitableForContent = blocks.filter(b => b.w >= 4 && b.h >= 2);

        let contentBlockIndex = -1;
        if (suitableForContent.length > 0) {
            // Pick one from suitable blocks
            const target = suitableForContent[Math.floor(Math.random() * suitableForContent.length)];
            contentBlockIndex = blocks.indexOf(target);
        } else {
            // Fallback: Pick the largest block
            let maxArea = -1;
            blocks.forEach((b, i) => {
                const area = b.w * b.h;
                if (area > maxArea) {
                    maxArea = area;
                    contentBlockIndex = i;
                }
            });
        }

        if (contentBlockIndex !== -1) {
            blocks[contentBlockIndex].type = 'content';
        }
    }

    return {
        name: "Smart BSP",
        cols: GRID_SIZE,
        rows: GRID_SIZE,
        blocks: blocks // Return full block objects including type
    };
};
